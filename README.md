# Mever Portfolio

Personal portfolio website for Ibrohim (Mever): a cybersecurity student and developer focused on C/C++, Linux, and frontend craft.

## Highlights

- Responsive one-page portfolio with a strong cyber-inspired visual identity
- Dual language support: English and Russian
- Dark and light themes with saved user preference
- Project filtering, animated skill bars, and polished section reveals
- Accessible navigation improvements, focus states, and reduced-motion support
- SEO basics: canonical URL, Open Graph metadata, favicon, manifest, robots, and sitemap

## Stack

- HTML5
- CSS3
- Vanilla JavaScript

## Project Structure

```text
.
├── assets/
├── css/
│   └── style.css
├── js/
│   └── main.js
├── index.html
├── robots.txt
├── sitemap.xml
└── site.webmanifest
```

## Local Preview

```bash
npm run preview
```

The preview script starts a simple local static server on port `8000`.

## Quality Check

```bash
npm run check
```

This validates the JavaScript syntax with Node.

## Deployment

The site is designed for static hosting and works well with GitHub Pages:

- Production URL: `https://7teenmever.github.io/my-website/`
- No backend is required

## Notes

- The contact form is prepared for Formspree. Replace `YOUR_FORM_ID` in `index.html` to activate it.
- `node_modules/` is intentionally ignored and should not be committed.
