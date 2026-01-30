# Backend fix: "expected array, received string" on update trip

The frontend now sends **all trip fields (including arrays) in one FormData field** called `payload` as a JSON string. Files are still sent as separate FormData fields (`cover_img`, `promotional_video`, `gallery_images`, `tt_img`).

**Backend change:** In your **updateTrip** controller, use `req.body.payload` as the main payload instead of spreading `req.body`.

## 1. Build payload from the JSON string

Right after you get `req.body` and handle `req.files`, **replace** building payload from `req.body` with parsing `payload`:

```ts
// Parse the JSON payload (contains arrays: included, notIncluded)
let payload: any = {};
if (req.body.payload && typeof req.body.payload === "string") {
  try {
    payload = JSON.parse(req.body.payload);
  } catch (e) {
    return sendError(res, "Invalid payload", status.BAD_REQUEST);
  }
}

// If you currently do: const { ...payload } = req.body;
// Remove that and use the parsed payload above.
// Then merge any file URLs from req.files into payload (coverImage, promotionalVideo, galleryImages, weekendTt) as you already do.
```

## 2. Rest of controller unchanged

- Continue handling `req.files` and writing `payload.coverImage`, `payload.promotionalVideo`, `payload.galleryImages`, `payload.weekendTt` (or your field names) from uploaded files.
- Then run your existing validation: `updateTripSchema.safeParse(payload)`.
- Then update the trip in the DB as you do now.

## Example (minimal diff)

**Before (causing "expected array, received string"):**
```ts
const { ...payload }: any = req.body;
// ... handle req.files and assign to payload ...
const validationResult = updateTripSchema.safeParse(payload);
```

**After:**
```ts
let payload: any = {};
if (req.body.payload && typeof req.body.payload === "string") {
  try {
    payload = JSON.parse(req.body.payload);
  } catch (e) {
    return sendError(res, "Invalid payload", status.BAD_REQUEST);
  }
}
// ... handle req.files and assign to payload (coverImage, promotionalVideo, etc.) ...
const validationResult = updateTripSchema.safeParse(payload);
```

After this change, `included` and `notIncluded` will be real arrays and validation will pass.
