# WW BlueCon — Clickable Demo

Connects the winning variants from `.planning/sketches/` into one browsable flow, for showing the
client. No build step — pure HTML/CSS/JS.

## How to open
Double-click `device-scan.html` (or `index.html`, which redirects there) to open it directly in
any browser. All navigation is real page-to-page links, so it works straight from the file system —
no server required.

## Flow
- **Device Scan** → tap a device → **Confirm Device** → **Home** (dashboard)
- From Home, System Info, Monitoring, Settings, or Device: the bottom nav links between all five
  dashboard screens — **Home** (added 2026-11-10, redesigned 2026-11-11) is the leftmost item and,
  since 2026-11-11, is also the screen you land on right after connecting (previously System Info;
  changed directly by the user — System Info is still one tap away, just no longer the default)
- **Set Up New Device** (linked from the bottom of Device Scan) covers first-boot pairing via
  either QR code or Power-On Hold recovery, ending on Home (same change)
- **Exit device** — a small icon next to the "Connected" status in the header of all five
  dashboard screens (Home included), added 2026-11-06 per user feedback (there was previously no
  way out of single-device management back to the device list). Links straight back to Device Scan.
- **Relay State on RF Link Lost** — added 2026-11-07 as its own per-relay control (safety
  requirement) separate from the old Relay Failsafe tab's combined power/RF-loss setting; merged
  2026-11-10 into one "Relay Failsafe" card on Settings → I/O Ports — see below.
- **2026-11-10 hardware corrections:** System Info's Power/Battery rows merged into one voltage +
  source reading (Mains/Battery/Battery · Critical); Settings → Radio Configuration collapsed to a
  single Region picker (no Channel/Password/Transmit Power/Profile); all Wi-Fi UI removed — Network
  Settings is Ethernet-only and the Firmware Update flow has one path (Bluetooth), no path-select
  step. See `.planning/sketches/003-system-info`, `011-settings`, `012-device` READMEs and
  `MANIFEST.md`'s Open Items for the full rationale.
- **2026-11-10 Monitoring corrections (gap analysis vs. `.init_docs/UI-UX_Raw_data.md`):** I/O
  1–4's status vocabulary changed from Idle/Off/On to the device's real supervised-circuit states
  (Active/Inactive, with Open Circuit/Short Circuit as fault states demonstrable via a dev toggle
  in the sketch); the Monitoring screen's "Battery & Tamper" card is now just "Tamper," split into
  Tamper 0 (DIN-rail switch) and Tamper 1 (external sensor) — the old "Battery Backup" row assumed
  a second, distinct battery that the corrected power model (System Info's merged Power row) rules
  out. See `.planning/sketches/010-monitoring`'s README and `MANIFEST.md`'s Open Items.
- **2026-11-10 Alarm Output (Central Unit only)** — new section on Settings → I/O Ports: assigns
  any free I/O port or relay as an alarm signal into the site's access-control panel. Role-gated to
  Central Unit — see `.planning/sketches/011-settings`'s README for the full rationale (this is a
  role distinction, not a hardware one).
- **2026-11-10 Data Port gets a 3rd mode (RS485); Relay Failsafe merged into I/O Ports:** Data
  Port is now Wiegand/OSDP/RS485 (was 2 modes), each auto-assigning I/O 1–4 to a fixed
  REX/DPS/LED/BUZ role shown on a new "I/O Port Assignment" card — only RS485 leaves I/O 1–4
  freely assignable on the I/O Ports tab. Supervised I/O simplified to Input/Output only (no
  EOL-type dropdown — that never existed on the real device). Settings' old Tab 1 "Relay
  Failsafe" (Remote-only, combined power+RF trigger) is gone — merged into one not-role-gated
  "Relay Failsafe" card on I/O Ports with two independent per-relay controls, On Power Loss and On
  Radio-Link Loss, each a compact two-state toggle. Tab 1 is now always "Radio." See
  `.planning/sketches/011-settings`'s README and `MANIFEST.md`'s Open Items for the full detail.
- **2026-11-10 Expansion Boards** — the last gap-analysis item. Settings → I/O Ports gained an
  "Expansion Boards" card: W2 Board (informational — disables Wiegand on this unit's Data Port and
  claims I/O 1–4, even under RS485) and R2IO Board (Input 3–4 + Relay 3–4, each relay with its own
  On Power Loss / On Radio-Link Loss toggles). Monitoring → I/O & Relays gained a matching
  read-only "Expansion Boards" status card — board list, tap to expand each board's port-level
  status. See `.planning/sketches/011-settings` and `010-monitoring` READMEs for the full detail.
- **2026-11-10 follow-up corrections (direct user feedback, same day):** System Info gained its
  own "Expansion Boards" section (Device Identity card) — it had been missed when the other two
  screens got theirs. Monitoring's I/O & Relays vocabulary now depends on port direction: Input
  ports show **Normal/Alarm/Open/Short** (4 real supervised states), Output ports keep the simple
  **Active/Inactive**. W2's D0/D1 (Wiegand data lines) show no status indicator at all — a muted
  dash — since they're a pulsed data bus, not a level worth polling. Tamper moved from the RFID &
  Power tab to I/O & Relays (where it belongs; it had been misplaced during the earlier
  Battery-Backup-removal pass). See `.planning/sketches/003-system-info` and `010-monitoring`
  READMEs for the full detail.
- **2026-11-11 correction: R2IO's Input 3/4 are plain inputs, not Supervised I/O.** The
  Normal/Alarm/Open/Short vocabulary above was wrongly extended to R2IO's Input 3/4 — R2IO (and
  other expansion modules) are plain inputs and relay outputs, no EOL wire-fault detection.
  Reverted to plain **Idle/Active** (matching onboard IN1/IN2), and dropped the now-misleading
  direction tags from Input 3/4 and Relay 3/4. See `.planning/sketches/010-monitoring`'s README for
  the full detail.
- **2026-11-10 Device Name + BLE Transmit Power, moved to their own tab 2026-11-11** — "Device
  Name" (editable; the device previously had no user-customizable name anywhere) and "BLE
  Transmit Power" (3 levels, framed as a security/interception-range control) now live together in
  **one "BLUETOOTH" section with a single Save button** on Device's new 3rd tab, Bluetooth — Device
  is now Firmware & Log · Security · Bluetooth. See `.planning/sketches/012-device`'s README and
  `MANIFEST.md`'s Open Items for the full detail.
- **2026-11-10 Home screen added, redesigned 2026-11-11.** User-proposed 5th nav destination since
  Settings/Monitoring/Device have each grown several tabs deep. First pass mirrored the 4 top-level
  destinations only as big icon tiles. After reviewing a competing mockup for US-installer
  usability, redesigned to: a device photo/name card with a prominent "Add Expansion Board"
  action, a System Info row, then Settings/Monitoring/Device sections — one **clean 2-color icon
  row** (no tiles) per *real, current* tab (10 rows total), each deep-linking via URL hash straight
  into that tab on Settings/Monitoring/Device (e.g. `settings.html#dataport` lands directly on the
  Data Port tab). `demo/`'s settings/monitoring/device.html each gained tab-button ids + an on-load
  hash handler reusing their existing tab-switch logic — no new screens, no routing change. See
  `.planning/sketches/014-home`'s README for the full critique and rationale.
- **2026-11-11 Remote Unit Configuration (stage + apply).** Settings → Radio (Central-only) gained
  a "Remote Unit Configuration" card — "Create Remote Unit Configuration" bundles Data Port/I/O
  Ports/Network settings into a config preset. Set Up New Device's wizard gained a matching
  "Apply Remote Unit Configuration?" step, shown right after the mandatory login/password screen,
  with a read-only summary and Apply/"Set Up Manually Instead" choices. This is the "stage once on
  Central, just flash it on Remote" flow from the raw-data onboarding brief — sequential, one BLE
  connection at a time, not simultaneous dual-device config (ruled out as a much bigger
  architecture change for a workflow installers don't need). See `.planning/sketches/011-settings`
  and `013-init-wizard` READMEs for the full detail.
- **2026-11-11 Home is now the post-connect landing screen.** Reverses the original Home-rollout
  decision ("additive 5th item, System Info stays the landing screen") — user asked directly for
  this change. `confirm-device.html`'s "Confirm Device" success path and `init-wizard.html`'s
  "Continue to Dashboard" (end of first-boot setup) both now route to `home.html` instead of
  `system-info.html`. System Info is unchanged otherwise — still reachable from the bottom nav and
  from Home's own "System Info" row, just no longer where you land automatically.
- **2026-11-11 Settings: unified "Save All" per tab (P0.1 of a shared UI/UX refactor plan).**
  Replaced Settings' 7 independent per-card Save buttons with one sticky "Save All" bar per tab,
  aggregating only that tab's own dirty fields (I/O Ports' 4 cards — Supervised I/O, Relay
  Failsafe, Expansion Boards, Alarm Output — now save together under one bar). Fixes the
  highest-risk gap flagged in the plan: editing two cards on one tab and tapping only one Save
  used to leave the other change silently unsaved. See `.planning/sketches/011-settings`'s README
  for the full detail.
- **2026-11-11 Settings: accordion on the I/O Ports tab (P0.2 of the same plan).** Supervised I/O
  stays open (the card almost every install needs); the other three cards — Relay Failsafe,
  Expansion Boards, Alarm Output — now collapse to a one-line live summary by default, tap to
  expand. Summaries reflect real state (e.g. "5 min · R1 Secure/Secure · R2 Safe/Safe"), not static
  labels. See `.planning/sketches/011-settings`'s README for the full detail.
- **2026-11-11 Settings: progressive disclosure for Pulse/Interpulse (P0.3 of the same plan).**
  Data Port's Wiegand mode no longer shows the Pulse/Interpulse fields merely greyed-out when
  Manual Timing is off — they're hidden entirely, appearing only once Manual Timing is switched
  on. See `.planning/sketches/011-settings`'s README for the full detail.
- **2026-11-11 Home: status dashboard instead of a sitemap (P0.4, last item of the same plan).**
  The 10 tab-level link rows collapsed to 4 one-row cards (System Info/Settings/Monitoring/
  Device), each with a one-line status summary instead of restating tab names. Added a live status
  strip (Signal, Power) to the device card, reusing System Info's own status-indicator component.
  "Add Expansion Board" shrank from a full-width CTA to a compact pill. See
  `.planning/sketches/014-home`'s README for the full detail.

## What's included
| Screen | Source sketch | Winner |
|---|---|---|
| Home | 014 | Final (2026-11-11) — status dashboard: live indicators + 4 one-row cards |
| Device Scan | 001 | A — Radar Pulse Hero |
| Confirm Device | 002 | A — Device Card |
| System Info | 003 | B — Flat Status |
| Monitoring | 010 | B — Segmented Tabs |
| Settings (Radio/Relay Failsafe · Data Port · I/O Ports · Network) | 011 | assembly |
| Device (Firmware & Log · Security · Bluetooth) | 012 | assembly |
| Set Up New Device (QR + Power-On Hold) | 013 | A — Full-Screen Countdown |

## What's intentionally left out
This is the "lightweight" version: each page carries its own local state (role, form values, demo
data) and nothing persists across pages — e.g. switching to the Edge role on Settings doesn't
change what System Info shows. A fully state-connected version would need real shared state across
pages, closer to the eventual Flutter app than a demo is worth building.

A couple of in-phone "(dev)" buttons remain where there's no way to simulate real hardware from a
browser (scanning a physical QR code, pressing a button on the device) — these are meant to be
clicked by whoever is driving the demo, standing in for the real action.
