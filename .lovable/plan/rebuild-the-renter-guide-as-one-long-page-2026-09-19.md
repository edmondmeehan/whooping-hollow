# Rebuild the renter guide as one long page

## What will change
- Replace the tabbed `/guide` experience with one continuous page renters can open directly before their stay.
- Use the current Whooping Hollow cream, ink, and gold style so the guide feels connected to the home page.
- Add a compact guide header and a sticky section menu linking to Welcome, House Info, Local Area, Check-out, and Emergency.
- Present every existing admin-managed guide section in order, with clear headings and readable long-form content.
- Keep Wi-Fi details easy to scan and make emergency information visually distinct near the bottom.
- Add renter-friendly contact links and a simple footer, while keeping the guide hidden from the main site navigation.

## Existing behavior preserved
- `/guide` remains public with no login, suitable for sharing in advance.
- Guide content continues to come from the existing admin Guide editor and updates without changing that workflow.
- Existing guide text and section order remain unchanged unless edited in admin.

## Technical details
- Replace the tab-based renderer with a single-page section renderer using the existing local-storage content source.
- Reuse the homepage design tokens and Manrope typography; no new backend or authentication changes.
- Support anchor navigation, mobile layouts, and print-friendly output.
- Verify the page on desktop and phone and confirm the project builds cleanly.
