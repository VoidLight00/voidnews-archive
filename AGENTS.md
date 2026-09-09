<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Source image selection

For new or refreshed thumbnails, apply `references/source-image-policy.json` through `scripts/lib/source-image.mjs`: use the first meaningful image at the top of the official article, then its OG share image when the article image is unavailable. Exclude navigation, logos, avatars, hidden/tracking images and unrelated article cards. Keep image identity and record source URL and selection kind in the cache manifest. Preserve existing thumbnail choices unless replacement is requested. Run `node scripts/check-source-image-policy.mjs` before publishing.
