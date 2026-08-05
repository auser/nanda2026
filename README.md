# The Object Internet — native Slidev deck

`slides.md` is the source of truth. This is a native Slidev project, not a Marp deck renamed to Markdown.

It uses:

- Slidev deck headmatter
- Slidev slide separators and per-slide frontmatter
- local assets served from `public/assets`
- project-level `style.css`
- presenter notes in the final HTML comment of each timed slide

## Run

```bash
npm install
npm run dev
```

## Publish to GitHub Pages

This repository includes a GitHub Actions workflow that builds the deck and deploys it to GitHub Pages whenever `main` changes. It uses Slidev's hash router and derives the project-page base path from the repository name, so the published assets work under `/nanda2026/`.

Enable **Settings → Pages → Source → GitHub Actions** once, then push to `main`. The site will be available at:

<https://auser.github.io/nanda2026/>

To test the Pages build locally:

```bash
PAGES_BASE=/nanda2026/ pnpm run build:pages
```

The timed PowerPoint export is uploaded with the site and will be downloadable at:

<https://auser.github.io/nanda2026/The-Object-Internet-NANDA.pptx>

## Export the timed 14-slide talk

```bash
npm run export:pdf
npm run export:pptx
```

## Export the full deck with appendix

```bash
npm run export:pdf:full
npm run export:pptx:full
```

Slidev exports PPTX slides as images and carries the presenter notes into the notes pane. The timed file is the 14-slide conference talk; the full file includes the appendix.

## Publish a PPTX release

Push a version tag to build the timed PPTX and attach it to a GitHub Release:

```bash
git tag v1.0.0
git push origin v1.0.0
```

Tags beginning with `v` trigger the release workflow. The generated PPTX includes the speaker notes.

## Core boundary

> Viewer owns meaning. Registry owns resolution.

The Hologram viewer selects an addressed protocol and reconstructs the experience. `kappa-registry` resolves and verifies the addressed object closure without exposing physical layout. The deck also separates the shipped Kappa substrate from the broader cloud-projection roadmap.
# nanda2026
