import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";
import { z } from "npm:zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const FROM = Deno.env.get("REVIEW_FROM_EMAIL") ||
  "Whooping Hollow <onboarding@resend.dev>";
const NOTIFY_EMAIL = "eddie@please.co";

const BodySchema = z.object({
  guestName: z.string().min(1).max(120),
  rating: z.number().int().min(1).max(5),
  title: z.string().max(120).optional().nullable(),
  body: z.string().min(1).max(4000),
  checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().nullable(),
});

function escapeHtml(text: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function stars(rating: number): string {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

function notificationHtml(input: {
  guestName: string;
  rating: number;
  title?: string | null;
  body: string;
  checkOut?: string | null;
}): string {
  const name = escapeHtml(input.guestName);
  const title = input.title ? escapeHtml(input.title) : "";
  const reviewBody = escapeHtml(input.body)
    .split(/\n{2,}|\n/)
    .filter(Boolean)
    .map((p) =>
      `<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">${p}</p>`
    )
    .join("");
  const checkOut = input.checkOut
    ? `<span style="color:#6f675c;">Stay ending ${escapeHtml(input.checkOut)}</span>`
    : "";

  return `
  <div style="margin:0;padding:0;background:#fffdf9;font-family:'Helvetica Neue',Arial,sans-serif;color:#1c1a17;">
    <div style="max-width:560px;margin:0 auto;padding:40px 28px;">
      <p style="margin:0 0 28px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#8a8175;">Whooping Hollow &middot; New guest review</p>
      <h1 style="margin:0 0 12px;font-size:24px;line-height:1.25;font-weight:700;">${name} left a review</h1>
      <p style="margin:0 0 24px;font-size:18px;color:#a87d12;letter-spacing:2px;">${stars(input.rating)} <span style="font-size:14px;color:#1c1a17;letter-spacing:0;">${input.rating}/5</span></p>
      ${title ? `<p style="margin:0 0 18px;font-size:17px;font-weight:600;">&ldquo;${title}&rdquo;</p>` : ""}
      <div style="margin:0 0 28px;padding:20px 22px;background:#ffffff;border:1px solid #e8e2d6;border-radius:2px;">${reviewBody}</div>
      <p style="margin:0;font-size:13px;line-height:1.6;color:#6f675c;">${checkOut}${checkOut ? " &middot; " : ""}Approve it in the admin panel &rarr; Reviews to share it on the site.</p>
    </div>
  </div>`;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    const input = parsed.data;

    const result = await resend.emails.send({
      from: FROM,
      to: [NOTIFY_EMAIL],
      reply_to: "eddie@please.co",
      subject: `New guest review — ${input.guestName} (${input.rating}/5)`,
      html: notificationHtml(input),
    });

    if ((result as any)?.error) {
      throw new Error(JSON.stringify((result as any).error));
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("notify-review error:", String(error?.message || error));
    return new Response(
      JSON.stringify({ success: false, error: String(error?.message || error) }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } },
    );
  }
});
