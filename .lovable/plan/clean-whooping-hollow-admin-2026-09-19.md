# Clean Whooping Hollow admin

## Goal
Bring `/admin` in line with the redesigned public site while keeping every existing admin workflow intact.

## What will change
- Restyle the magic-link login with the cream, ink, gold, and warm-border palette using Manrope throughout.
- Replace the crowded top tab strip with a collapsible left sidebar containing all current admin sections.
- Add a compact workspace header with the current section name, site link, account identity, and sign-out action.
- Present each admin tool in a spacious content canvas with consistent typography, borders, controls, and table treatment.
- Make the sidebar an accessible drawer on smaller screens and retain icon navigation when collapsed on desktop.

## Technical details
- Reuse the existing sidebar, button, tab, avatar, and form components.
- Keep hash-based section links so current bookmarked admin sections continue working.
- Scope the visual overrides to the admin area and define colors as semantic theme tokens.
- Preserve all existing forms, save actions, uploads, bookings, and service tools without changing their logic.
- Verify the login screen and authenticated shell at desktop and mobile sizes, then confirm the build is clean.
