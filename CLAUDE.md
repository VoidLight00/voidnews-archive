## Mandatory site workflow

Read and follow `AGENTS.md` before every task in this repository. Its mandatory source-thumbnail, content, browser, mobile and post-deployment checks are user requirements. Follow `REQUIREMENTS.md`; run `npm run verify:site -- --url <site-url>` against the deployed production URL before declaring a published change complete.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
