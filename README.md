# WW BlueCon — Flat UI demo

Clickable HTML demo of the WW BlueCon installer app. No build step: open `index.html` in any browser (works straight from the file system).

**Themes:** every screen has a Light / Dark / Auto switch (Auto follows the OS). The choice is remembered per browser.

**Source:** mirrored from the `flat-ui/` folder of `dzentec/ww_bluecon` (commit 73b5a0b). The previous demo (bottom-nav version) is kept in this repository's Git history.

---

# WW BlueCon — Flat UI

A from-scratch navigation redesign built from a reference UI the user supplied in
`.init_docs/UI_flat/` (`Flat_ui.md` + 8 mockup JPGs). This replaces the current `demo/`'s 5-item
bottom nav + multi-tab destinations with a flat, hub-and-spoke model: **no bottom nav anywhere**,
a single **Home** hub screen exposing every destination as a tappable icon, and every destination
a standalone screen with a **back-arrow that always returns to Home** (never a navigation stack).
`demo/` is untouched — this is a parallel exploration in its own folder, on its own branch
(`feature/flat-ui`).

## Why this exists
The reference mockups asked for: reuse of existing screens where content is unchanged, max 3 tabs
per screen, a back-arrow on every screen returning to a new Home, and no bottom nav. Implementing
this meant most of `demo/settings.html` and `demo/monitoring.html`'s multi-tab screens had to be
split into several narrower standalone screens, each simple enough to need 0-1 tabs on its own.

## Navigation map
**Home** (`home.html`) — device card (photo/name/model + "Add Expansion Board") + 3 icon
shortcuts (System Information, Device Maintenance, Stored Presets) + a Monitoring/Settings
switcher revealing a 5- or 6-icon grid. Every icon links straight to its own screen; there is no
hash deep-linking into a shared tabbed file the way the old `demo/home.html` did, because there's
no shared tabbed file left to link into.

**Pre-connection flow** (unchanged from `demo/`, just copied over): `device-scan.html` →
`init-wizard.html` (QR/Reset setup) → `confirm-device.html` → lands on `home.html`.

**Settings destinations** (6, each a standalone screen reached from Home's Settings grid):
`radio.html`, `data-port.html`, `io-ports.html`, `expansion-boards-settings.html`, `network.html`,
`device-behavior.html`.

**Monitoring destinations** (5): `radio-signal-log.html`, `osdp-wiegand.html`,
`io-relays-monitoring.html`, `expansion-boards-monitoring.html`, `power-faults-log.html`.

**Top-row destinations** (3): `system-info.html`, `device-maintenance.html`, `stored-presets.html`.

Only `device-maintenance.html` keeps internal tabs (Firmware & Log / Security / Bluetooth — 3,
right at the limit); every other destination collapsed to a single flat screen once its unrelated
content was split out, which is what makes the ≤3-tabs constraint fall out naturally.

## Content changes from `demo/` (per `Flat_ui.md`)
- **Radio** — the Job Profile card moved out entirely (now **Stored Presets**, its own screen).
- **I/O Ports** — Expansion Boards and Alarm Output moved out to their own destinations.
- **Expansion Boards (Settings)** — genuinely new interaction, not in `demo/` at all: a board list
  with up to 2 empty dashed slots, a "Scan Bus" button that detects a new board into the next
  slot and relabels itself "Save," confirming the board once tapped.
- **Device Behavior** — gained the Alarm Output card (moved in from I/O Ports).
- **Device Maintenance** — the "DEVICE HISTORY" section (reconnect-to-a-past-device list) was
  removed entirely; otherwise identical to `demo/device.html`'s first two tabs.
- **Monitoring's old "RFID & Power" tab** split three ways: **OSDP & Wiegand** (Last RFID Read +
  OSDP Monitoring), **Power Faults Log** (its own screen now), and Expansion Boards status moved
  out of "I/O & Relays" into its own **Expansion Boards (Monitoring)** screen with each board as
  its own expanded section instead of two nested inside one card.
- **Stored Presets** — generalizes this session's "Job Profile" feature per `Flat_ui.md`: a
  preset bundles *both* Central and Remote config — whichever role you're actually configuring,
  the other half is auto-generated. Simulated for display only (no real cross-device state in a
  static demo): saving records the configuring role into the preset's `Config:` label, applying a
  preset notes that the other role's half was auto-generated. Rows show `Date:`/`Config:` and
  expand in place to reveal **Delete**/**Apply Preset** actions, matching mockups 07/08.

## What's reused verbatim
`device-scan.html`, `init-wizard.html` (apart from Job Profile → Preset terminology on its apply
step), `confirm-device.html`, `system-info.html`, and all of `device-maintenance.html`'s OTA/
Security/Bluetooth logic — copied from `demo/` with only the header (back-arrow instead of
bottom-nav) and, for Device Maintenance, the Device History section changed.

## Verified
Every one of the 18 files loads with no console errors; every Home icon resolves to a real file
(checked via `fetch` status 200 for all 18); the Settings/Monitoring switcher toggles correctly;
the Expansion Boards Scan Bus → Save flow correctly fills a slot and confirms it; the Stored
Presets expand/Delete/Apply/Save flow works; a back-arrow (tested from `radio.html`) returns to
`home.html`; no file in this folder contains `bottom-nav` markup; only `device-maintenance.html`
has internal tabs (3, at the limit).
