import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { Resend } from "npm:resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const FROM = Deno.env.get("REVIEW_FROM_EMAIL") ||
  "Whooping Hollow <onboarding@resend.dev>";
const SITE_URL = Deno.env.get("SITE_URL") || "https://whoopinghollow.com";
const DAYS_AFTER_CHECKOUT = 3;

function escapeHtml(text: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function firstName(name: string): string {
  return escapeHtml((name || "").trim().split(/\s+/)[0] || "there");
}

function reviewEmailHtml(guestName: string, link: string): string {
  return `
  <div style="margin:0;padding:0;background:#fffdf9;font-family:'Helvetica Neue',Arial,sans-serif;color:#1c1a17;">
    <div style="max-width:560px;margin:0 auto;padding:40px 28px;">
      <p style="margin:0 0 28px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#8a8175;">Whooping Hollow &middot; East Hampton, NY</p>
      <h1 style="margin:0 0 20px;font-size:28px;line-height:1.2;font-weight:700;">How was the house, ${guestName}?</h1>
      <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">Thanks again for staying with us. We'd love to hear how it went &mdash; what you loved, and anything we could do better for the next guests.</p>
      <p style="margin:0 0 28px;font-size:16px;line-height:1.6;">It takes about a minute, and with your okay we may share it on our site.</p>
      <p style="margin:0 0 32px;">
        <a href="${link}" style="display:inline-block;background:#1c1a17;color:#fffdf9;text-decoration:none;padding:14px 26px;font-size:15px;font-weight:600;border-radius:2px;">Leave a review</a>
      </p>
      <p style="margin:0 0 28px;font-size:13px;line-height:1.6;color:#6f675c;">Or paste this link into your browser:<br><a href="${link}" style="color:#a87d12;">${link}</a></p>
      <p style="margin:0;font-size:15px;line-height:1.6;">Come back anytime &mdash; booking direct with us is always the best rate.</p>
      <p style="margin:24px 0 0;font-size:15px;line-height:1.6;">Eddie<br><span style="color:#6f675c;">Whooping Hollow</span></p>
    </div>
  </div>`;
}

async function sendForStay(
  supabase: ReturnType<typeof createClient>,
  stay: Record<string, any>,
) {
  const link = `${SITE_URL.replace(/\/$/, "")}/review/${stay.review_token}`;
  try {
    const result = await resend.emails.send({
      from: FROM,
      to: [stay.guest_email],
      reply_to: "eddie@please.co",
      subject: "How was your stay at Whooping Hollow?",
      html: reviewEmailHtml(firstName(stay.guest_name), link),
    });

    if ((result as any)?.error) {
      throw new Error(JSON.stringify((result as any).error));
    }

    await supabase
      .from("stays")
      .update({
        review_email_sent_at: new Date().toISOString(),
        review_email_error: null,
      })
      .eq("id", stay.id);

    return { id: stay.id, sent: true };
  } catch (error: any) {
    const message = String(error?.message || error);
    console.error(`Failed to send review email for stay ${stay.id}:`, message);
    await supabase
      .from("stays")
      .update({ review_email_error: message })
      .eq("id", stay.id);
    return { id: stay.id, sent: false, error: message };
  }
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );

  try {
    let stayId: string | undefined;
    try {
      const body = await req.json();
      stayId = typeof body?.stayId === "string" ? body.stayId : undefined;
    } catch (_) {
      // no body: scheduled run
    }

    let query = supabase.from("stays").select("*");

    if (stayId) {
      query = query.eq("id", stayId);
    } else {
      const cutoff = new Date();
      cutoff.setUTCDate(cutoff.getUTCDate() - DAYS_AFTER_CHECKOUT);
      query = query
        .is("review_email_sent_at", null)
        .lte("check_out", cutoff.toISOString().slice(0, 10));
    }

    const { data: stays, error } = await query;
    if (error) throw new Error(error.message);

    const results = [];
    for (const stay of stays ?? []) {
      results.push(await sendForStay(supabase, stay as Record<string, any>));
    }

    return new Response(
      JSON.stringify({ success: true, processed: results.length, results }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    );
  } catch (error: any) {
    console.error("send-review-requests error:", error);
    return new Response(
      JSON.stringify({ success: false, error: String(error?.message || error) }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    );
  }
});
