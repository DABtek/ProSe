# ProSe Wireframe Spec (Mobile-First)

## Frame + Grid
- Frame: iPhone 14/15 (393 x 852), auto-layout column
- Grid: 4pt base, 8pt spacing increments
- Safe area: 16pt horizontal padding, 24pt top, 88pt bottom (tab bar)

## Typography
- Headings: DM Serif Display
- Body/UI: IBM Plex Sans
- Scale:
  - H1 28/32
  - H2 22/28
  - H3 18/24
  - Body 15/22
  - Label 12/16 (uppercase optional)

## Color Tokens
- Ink: #0B1B2B
- Parchment: #F6F1E8
- Sand: #E6D8C0
- Teal: #2A6F6B
- Gold: #C9A227
- Rust: #B84040
- Fog: #EEF2F3

## Global Components
- Top Bar: app name + case selector + profile
- Legal Banner: persistent 1-line "Not legal advice" strip
- Card: 12pt radius, 16pt padding, subtle shadow
- Tag: 8pt radius, color-coded (Document, Deadline, Evidence, Draft)
- Bottom Tab Bar: 5 items, icons + label

## Navigation (Bottom Tabs)
1. Home
2. KB
3. Drafts
4. Timeline
5. Learn

---

## Screen 1: Onboarding / Set Jurisdiction
- Title: "Choose Your Court Location"
- Two-step:
  1) State selector (default WA)
  2) County selector
- CTA: "Save & Continue"
- Helper text: "We use this to load local court rules and forms."

## Screen 2: Home (Case Dashboard)
- Header: Case name + case number
- Quick Actions (3 cards):
  - Upload Document
  - Draft a Filing
  - Record a Note
- Highlights:
  - Upcoming deadlines (2 items)
  - Recent documents (3 items)
- Legal banner under header

## Screen 3: Knowledge Base (KB)
- Search bar + filters (Docs, Notes, Audio, Photos)
- List cards:
  - Document title
  - Type tag
  - Date
  - Action: "Analyze"
- Floating action: "Upload"

## Screen 4: Document Viewer / Analysis
- Viewer area (PDF preview placeholder)
- Summary block:
  - "Plain-language summary"
  - "Key dates"
  - "Relevant WA rules" (citations)
- CTA: "Create Draft from This"
- Legal banner pinned above actions

## Screen 5: Draft Wizard
- Stepper: Details → Narrative → Review
- Prefilled fields:
  - Court, case number, parties
- Narrative input with tips
- CTA: "Save Draft" + "Export"
- Draft status badge: Draft / Filed

## Screen 6: Timeline
- Vertical timeline list
- Each entry:
  - Date
  - Event label
  - Source (doc name or manual)
- Toggle: "Show deadlines only"

## Screen 7: Learn / Glossary
- Search
- Sections:
  - "Common Terms"
  - "WA Procedures"
  - "FAQs"
- Glossary cards with short defs + "Learn more"

## Screen 8: Settings
- Jurisdiction edit
- Data export
- Provider selection
- Legal Safety Policy link
- Delete account

---

## Microcopy Examples
- Legal banner: "General legal information only. Not legal advice."
- Upload helper: "Files stay private to your account."
- Draft helper: "Templates only. Please review with a licensed attorney."

