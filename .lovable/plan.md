

# Fix Auaha Broken Links

## Problem
The Auaha sidebar has 17 nav links but there are route mismatches causing blank pages or 404s:

1. **Duplicate Image Studios** — Nav links to `/auaha/image-studio` (PixelImageStudio) but there's also `/auaha/images` (AuahaImageStudio). Two competing components for the same purpose.
2. **Route path `images` vs nav path `image-studio`** — The old `AuahaImageStudio` at `/auaha/images` is orphaned (no nav link points to it). The nav's "Image Studio" link at `/auaha/image-studio` works correctly.

## What I'll do

### 1. Remove the orphaned `/auaha/images` route
- Delete the route for `images` → `AuahaImageStudio` from App.tsx
- Remove the lazy import for `AuahaImageStudio`
- Delete `src/components/auaha/AuahaImageStudio.tsx` (superseded by `src/pages/auaha/ImageStudio.tsx` which has proper brand-locking)

### 2. Verify all 17 nav links match routes
Cross-check every entry in `AUAHA_NAV` against the route definitions in App.tsx to confirm they all resolve. Based on my audit, the remaining 16 routes all match correctly.

### Files modified
- `src/App.tsx` — remove orphaned `images` route + lazy import
- `src/components/auaha/AuahaImageStudio.tsx` — delete

