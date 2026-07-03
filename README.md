# RC Services Website

Tax compliance & accounting services site for RC Services (Coimbatore), built with Next.js (App Router).

## ⚠️ Important — this is a partial project

This repo currently only contains the `app/` directory (pages + 2 API routes) since that's
all that was provided. **Before this will run**, you need to add:

- `components/` — Navbar, Footer, FloatingWhatsApp, LeadPopup (not included — recreate or supply your own)
- `context/LeadContext.js` — the lead-storage logic referenced by every page (`useLeads`, `addLead`) (not included)
- Root config files: `package.json`, `next.config.js`, `tailwind.config.js`, `postcss.config.js`, `jsconfig.json`/`.eslintrc`
- A `public/` folder for the logo/images referenced in `layout.js` metadata

## How to push this to GitHub

```bash
git init
git add .
git commit -m "Initial commit: RC Services site"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Or, on github.com: create a new repository → "uploading an existing file" → drag the
extracted `app/` folder (plus your own components/context/config) into the upload box → commit.

## Recent changes in this version

- Removed "Service Area" / states-covered section from the Contact page.
- Contact method is WhatsApp + Email only — no phone/call links anywhere.
- Phone number is never shown as visible text (it's still embedded in the WhatsApp
  `wa.me` link/button so the chat opens correctly, but no `+91 90801 08358` text appears
  anywhere on the rendered page or in SEO metadata).
- Support email updated to `rcservices147@gmail.com`.
- Admin dashboard passcode changed to `deivam`.

## Known issues to fix before going live

- **Admin passcode is not secure.** It's hardcoded in client-side JavaScript
  (`app/admin/page.js`), so anyone who views the page source can read it. This is fine for
  a demo but should be replaced with real server-side auth before production use.
- `app/api/contact/route.js` and `app/api/upload/route.js` exist but aren't called by any
  page yet — all forms currently go straight to local state + WhatsApp.
- File "uploads" on the Services page are UI-only; nothing is actually sent/stored.
- Leads are very likely stored only in browser localStorage via `LeadContext.js` (not
  included here) — confirm this, since it means leads don't sync across devices/browsers.
- Google Analytics ID in `layout.js` is a placeholder (`UA-XXXXXXXXX-X`) and uses the
  deprecated Universal Analytics snippet — replace with a real GA4 ID.
- All metadata URLs now point consistently to `rcservices.vercel.app`. When you buy a custom domain later, do a project-wide find-replace of `rcservices.vercel.app` with your new domain.
