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

## Architecture

### Main Site (`/`)
- `index.html` — portfolio page (Strata template)
- `index.js` — scroll-triggered header animation
- `index.css` — custom overrides
- `assets/js/main.js` — jQuery-based responsive layout (breakpoints, parallax, poptrox lightbox)
- `assets/css/main.css` — primary stylesheet (generated from `assets/sass/`)

### Mapbox Storytelling (`/projects/storytelling/`)
A configuration-driven scrollytelling template using Mapbox GL JS and Scrollama.js.
- `src/config.js` — defines the story: chapters, map positions, layer visibility, theme
- `src/index.html` — template that reads config and renders the scroll-driven map narrative
- `src/helper.html` — interactive tool for finding map positions (lat/lng/zoom/bearing/pitch)
- Chapters control map layers via `onChapterEnter`/`onChapterExit` callbacks

### Data Files
- `assets/UCDP_filtered2.geojson` — conflict event data (Afghanistan/Tajikistan, 1989-2021)
- `assets/Meteorite_Landings.csv` — meteorite impact dataset

## Key Dependencies (loaded via CDN/local)
- jQuery + poptrox (lightbox gallery)
- Mapbox GL JS v2.11.0
- Scrollama.js
- Font Awesome
