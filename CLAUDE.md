# Site Overview

Personal markdown blog ("Henlightened") built with Next.js 13 App Router, React, and Tailwind CSS. Deployed on Vercel via GitHub push.

## Stack

- **Next.js 13.4** (App Router), **React 18**, **Tailwind CSS 3**
- **Markdown processing**: gray-matter (frontmatter) → unified pipeline → HTML
  - remark-gfm (GitHub Flavored Markdown: tables, strikethrough)
  - remark-math + rehype-katex (LaTeX: `$inline$` and `$$display$$`)
  - rehype-highlight + highlight.js (syntax highlighting, Python configured)
  - rehype-external-links (auto opens external links in new tab)
- **Fonts**: Mulish (sans), EB Garamond (serif) via Google Fonts

## Directory Structure

```
app/                  # Next.js App Router
  page.jsx            # Home feed (client component, infinite scroll)
  layout.jsx          # Root layout — fonts, context providers, navbar
  posts/[id]/         # Post detail page (server component)
  api/posts/          # GET endpoint — paginated, filterable by category
  context/            # CategoryColoursProvider, SelectedCategoryProvider
components/
  navbar.jsx          # Sticky nav with category filter buttons
  postCard.jsx        # Standard post card (grid)
  heroPostCard.jsx    # Featured first post card (larger, shows description)
  logo.jsx
lib/
  serverPosts.js      # Reads .md files, runs markdown pipeline, returns HTML
  clientPosts.js      # Client-side fetch wrappers for /api/posts
posts/                # Markdown blog post files (*.md)
public/img/           # Post cover images
public/fonts/         # Custom fonts
```

## Blog Posts

Posts are `.md` files in `/posts/`. The filename (minus `.md`) becomes the URL: `/posts/[filename]`.

**Frontmatter fields:**
```yaml
---
title: "Post Title"
category: "Biology"          # Must be: Tech | Biology | Miscellaneous
date: "2026-03-30"           # ISO date, used for chronological sorting
coverImage: "/img/bfs_1/cover.png"
description: "Short summary shown on hero card"
isNew: "False"               # "True" shows a badge on hero card
---
```

## Category System

Categories defined in context: `All`, `Tech`, `Biology`, `Miscellaneous`
- Color-coded via `CategoryColoursProvider` (retroCategoryColours scheme in tailwind.config.js)
- Selected category stored in `SelectedCategoryProvider`; resets when logo is clicked
- API filters by category; home page re-fetches on category change

## Home Page Behaviour

- Fetches 16 posts per page from `/api/posts`
- First post renders as `HeroPostCard`, rest as `PostCard` grid
- Infinite scroll: loads more when user scrolls to bottom
- Category filter buttons in navbar drive filtering

## Tailwind Theme Notes

- Custom colors defined as `retroScheme` in `tailwind.config.js`
- Custom shadows: `shadow-[10px_10px_0]` and `shadow-[5px_5px_0]`
- `@tailwindcss/typography` plugin used in post pages for prose styling
- GitHub CSS stylesheet imported for code block appearance

## Common Tasks

**Add a new post:** Create `/posts/[slug].md` with frontmatter + markdown body. Add cover image to `/public/img/[slug]/`.

**Add a new category:** Update category list in `app/context/`, add colour mapping in `tailwind.config.js`, update navbar.

**Run locally:** `npm run dev` → http://localhost:3000

**Deploy:** Push to `main` on GitHub; Vercel auto-deploys.
