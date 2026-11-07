# WW BlueCon — Clickable Demo

Connects the winning variants from `.planning/sketches/` into one browsable flow, for showing the
client. No build step — pure HTML/CSS/JS.

## How to open
Double-click `device-scan.html` (or `index.html`, which redirects there) to open it directly in
any browser. All navigation is real page-to-page links, so it works straight from the file system —
no server required.

## Flow
- **Device Scan** → tap a device → **Confirm Device** → **System Info** (dashboard)
- From System Info, Monitoring, Settings, or Device: the bottom nav links between all four
  dashboard screens
- **Set Up New Device** (linked from the bottom of Device Scan) covers first-boot pairing via
  either QR code or Power-On Hold recovery, ending back at System Info
- **Exit device** — a small icon next to the "Connected" status in the header of all four
  dashboard screens, added 2026-11-06 per user feedback (there was previously no way out of
  single-device management back to the device list). Links straight back to Device Scan.
- **Relay State on RF Link Lost** — a new section on Settings → I/O Ports (2026-11-07, safety
  requirement), with its own Fail Secure/Fail Safe control per relay for radio-link loss
  specifically, separate from the existing Relay Failsafe tab's combined power/RF-loss control.

## What's included
| Screen | Source sketch | Winner |
|---|---|---|
| Device Scan | 001 | A — Radar Pulse Hero |
| Confirm Device | 002 | A — Device Card |
| System Info | 003 | B — Flat Status |
| Monitoring | 010 | B — Segmented Tabs |
| Settings (Radio/Relay Failsafe · Data Port · I/O Ports · Network) | 011 | assembly |
| Device (Firmware & Log · Security) | 012 | assembly |
| Set Up New Device (QR + Power-On Hold) | 013 | A — Full-Screen Countdown |

## What's intentionally left out
This is the "lightweight" version: each page carries its own local state (role, form values, demo
data) and nothing persists across pages — e.g. switching to the Edge role on Settings doesn't
change what System Info shows. A fully state-connected version would need real shared state across
pages, closer to the eventual Flutter app than a demo is worth building.

A couple of in-phone "(dev)" buttons remain where there's no way to simulate real hardware from a
browser (scanning a physical QR code, pressing a button on the device) — these are meant to be
clicked by whoever is driving the demo, standing in for the real action.
