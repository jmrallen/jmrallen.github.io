# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static personal portfolio/academic website for Jeremy Allen (PhD student, UBC), hosted on GitHub Pages. Built on the HTML5 UP "Strata" template with an integrated Mapbox storytelling subproject.

## Your Role
You are a web development agent responsible for building and maintaining this website.

## Working Style
- Always ask clarifying questions before starting major changes
- Create a detailed plan and get approval before implementation
- Work incrementally - implement one feature at a time
- After each feature, pause for review before continuing
- Never delete existing content without explicit confirmation

## Guidelines
- Use modern, responsive HTML/CSS/JavaScript
- Keep the design clean and professional
- Ensure all pages are mobile-friendly
- Follow accessibility best practices
- Test all changes before committing

## Key Tasks
1. Update website content as requested
2. Improve design and user experience
3. Fix any bugs or broken links
4. Optimize performance
5. Maintain consistent styling across pages

## Development & Deployment

- **No build process** — pure HTML/CSS/JS, edit files directly.
- **Local dev**: Open `index.html` in a browser or use VS Code Live Server.
- **Deploy**: Push to `main` branch; GitHub Pages serves automatically.

## CV Update Protocol

When I ask you to update my CV:

### Step 1: Ask Clarifying Questions
Before making any changes, ask about:
- What information am I adding? (publication, teaching, award, etc.)
- Do I have all required details?
  - For publications: Title, authors, venue, year, DOI/URL, PDF link, project page?
  - For teaching: Course name, role, term, institution?
  - For awards: Name, amount (if applicable), granting organization, year?
  - For experience: Position, institution, dates, description?
- Where should this appear in the CV? (chronological order, which section?)
- Any special formatting or notes needed?

### Step 2: Update Both Versions
After I provide the information:
1. Update cv.html (the web version) with the new content
2. Update cv.tex (LaTeX version) with identical information
3. Ensure formatting is consistent between both versions
4. Keep chronological order (most recent first, typically)

### Step 3: Commit and Push
- Commit both cv.html and cv.tex with a descriptive message like:
  "Add [publication/award/teaching] to CV: [brief description]"
- Push to GitHub to trigger automatic PDF compilation

### Step 4: Verify
- Confirm that both files were updated
- Note that the PDF will compile automatically via GitHub Actions
- Remind me to check the website in a few minutes to verify the PDF updated

## CV Consistency Rules
- Always update BOTH cv.html and cv.tex together
- Keep the same order and content in both versions
- Use consistent date formats (e.g., "September 2024" or "Fall 2024")
- Include all relevant links in HTML version
- Ensure LaTeX version compiles without errors

## Architecture

### Main Site (`/`)
- `index.html` — portfolio page (Strata template)
- `publications.html` — publications/conference abstracts page
- `cv.html` — HTML version of CV (master reference, keep in sync with cv.tex)
- `cv.tex` — LaTeX version of CV (compiled to PDF via GitHub Actions)
- `contact.html` — contact form (Formspree) and social links
- `index.js` — scroll-triggered header animation
- `index.css` — custom overrides
- `assets/js/main.js` — jQuery-based responsive layout (breakpoints, parallax, poptrox lightbox)
- `assets/css/main.css` — primary stylesheet (generated from `assets/sass/`)
- `assets/css/theme.css` — CSS variables for light/dark mode
- `assets/css/nav.css` — shared navigation bar styles
- `assets/css/overrides.css` — variable-based color overrides + component styles (publications, portfolio grid, project pages, contact form)
- `assets/css/cv.css` — CV page styles + `@media print` rules
- `assets/cv.pdf` — compiled CV PDF (auto-generated, do not edit manually)

### Cartography (`/cartography/`)
- `cartography/index.html` — portfolio grid of cartography projects
- `cartography/ghana-crema/index.html` — Ghana CREMA map project page
- `cartography/panjshir-offensives/index.html` — Panjshir Offensives project page
- `cartography/afghanistan-tajikistan/index.html` — Afghanistan-Tajikistan interactive JS map

### GitHub Actions
- `.github/workflows/compile-cv.yml` — compiles cv.tex to assets/cv.pdf on push

### Mapbox Storytelling (`/projects/storytelling/`)
A configuration-driven scrollytelling template using Mapbox GL JS and Scrollama.js.
- `src/config.js` — defines the story: chapters, map positions, layer visibility, theme
- `src/index.html` — template that reads config and renders the scroll-driven map narrative
- `src/helper.html` — interactive tool for finding map positions (lat/lng/zoom/bearing/pitch)
- Chapters control map layers via `onChapterEnter`/`onChapterExit` callbacks

### Data Files
- `assets/UCDP_filtered2.geojson` — conflict event data (Afghanistan/Tajikistan, 1989-2021)
- `assets/Meteorite_Landings.csv` — meteorite impact dataset

### Navigation
All pages share the same nav bar: Home | Publications | Cartography | CV | Contact. When adding/removing nav items, update ALL 8 pages:
- Root: `index.html`, `publications.html`, `cv.html`, `contact.html`
- Cartography: `cartography/index.html`, `cartography/ghana-crema/index.html`, `cartography/panjshir-offensives/index.html`, `cartography/afghanistan-tajikistan/index.html`
- Adjust relative paths for subdirectory pages (`../` for cartography/, `../../` for cartography/*/`)

### Thumbnail Images
Project thumbnails are referenced in two places:
- `index.html` — "Recent Work" grid on the home page
- `cartography/index.html` — portfolio card grid on the Cartography index page

## Key Dependencies (loaded via CDN/local)
- jQuery + poptrox (lightbox gallery)
- Mapbox GL JS v2.13.0
- Scrollama.js
- Font Awesome
