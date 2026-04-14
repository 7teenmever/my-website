# Mever – Portfolio Website

A polished, bilingual personal portfolio website for showcasing cybersecurity expertise, C/C++ development, and frontend work. Built with **React 18 + Vite** for modern performance and development experience.

## Features

✨ **Bilingual Interface** — Seamless EN/RU language switching with localStorage persistence  
🎨 **Dark/Light Theme Toggle** — User preference saved to localStorage  
🤖 **Matrix Background** — Animated ASCII matrix effect using HTML5 Canvas  
⌨️ **Typing Animation** — Dynamic text animation in the hero section  
📱 **Fully Responsive** — Mobile-first design, works across all devices  
🔍 **SEO Optimized** — Proper meta tags, structured data, and semantic HTML  
♿ **Accessible** — ARIA labels, keyboard navigation, focus management  
🎯 **Smooth Scroll** — Intersection Observer for reveal animations  
📋 **Contact Form** — Integrated with Formspree for email delivery  
🔑 **State Management** — React Hooks + Context API for theme and language  

## Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend Framework** | React 18, React Hooks, Context API |
| **Build Tool** | Vite 5, esbuild |
| **Styling** | CSS3 (custom properties, animations) |
| **Form Handling** | react-hook-form with validation |
| **HTTP Client** | Fetch API (Formspree) |
| **Icons** | Font Awesome 6.5 |
| **Fonts** | JetBrains Mono, Orbitron (Google Fonts) |
| **Dev Environment** | Node.js 18+ |

## Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.jsx      # Navigation with mobile menu & language/theme toggle
│   ├── Hero.jsx        # Hero section with typing animation
│   ├── About.jsx       # About section with terminal block
│   ├── Skills.jsx      # Skills with category badges
│   ├── Projects.jsx    # Projects with filter functionality
│   ├── Contact.jsx     # Contact form with Formspree
│   ├── Footer.jsx      # Footer section
│   └── MatrixCanvas.jsx # Matrix background animation
├── context/
│   └── ThemeContext.jsx # Theme & language global state
├── data/
│   ├── translations.js # EN/RU translations
│   ├── projects.js     # Project data & filters
│   └── skills.js       # Skills data & categories
├── App.jsx             # Main app component
├── main.jsx            # React DOM root
└── index.css           # Global styles + CSS variables

public/
├── favicon.svg
└── site.webmanifest
```

## Local Development

### Prerequisites
- Node.js 18+
- npm 9+ or yarn 4+

### Setup

1. **Clone repository**
   ```bash
   git clone https://github.com/7teenmever/my-website.git
   cd my-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment (optional)**
   ```bash
   cp .env.example .env
   # Edit .env to add your Formspree form ID
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Opens http://localhost:5173 automatically

### Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Production build to /dist |
| `npm run preview` | Preview production build locally |

## Deployment

### Build for Production

```bash
npm run build
```

Outputs optimized files to `dist/` directory.

### Deploy to Vercel (Recommended)

1. **Connect repo to Vercel** at [vercel.com](https://vercel.com)
2. **Configure build settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Add environment variables:**
   - `VITE_FORMSPREE_ID` = your Formspree ID
4. **Deploy automatically on push**

### Deploy to GitHub Pages

1. **Update vite.config.js** with:
   ```javascript
   export default defineConfig({
     base: '/my-website/',
     // ...
   })
   ```

2. **Build and deploy:**
   ```bash
   npm run build
   git add dist/
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

3. **Enable GH Pages** in repo settings → Pages → Source: `gh-pages` branch

## State Management

### useState Hooks
- `isMenuOpen` — Mobile menu toggle
- `activeFilter` — Project/skill category filter
- `formState` — Contact form input state (via react-hook-form)
- `theme` — Dark/light theme preference
- `lang` — EN/RU language preference

### useEffect Hooks
- **Typing animation** — Character-by-character text animation
- **Scroll animations** — IntersectionObserver for reveal effects
- **Active section tracking** — Navbar highlight on scroll
- **localStorage sync** — Persist theme & language across sessions

### useContext
- **ThemeContext** — Global theme & language state accessible to all components
- Provides `theme`, `lang`, `toggleTheme()`, `toggleLanguage()`

### react-hook-form
- Contact form field registration
- Built-in validation (required, email pattern, minLength)
- Error handling with status messages
- Async submission with loading state

## Customization

### Colors & Theme

Edit CSS custom properties in `src/index.css`:

```css
:root {
  --accent: #00d4ff;    /* Primary cyan */
  --accent2: #00ff88;   /* Secondary green */
  --accent3: #ff4466;   /* Tertiary red */
  --bg: #050508;        /* Dark background */
  --text: #e8e8f0;      /* Light text */
}
```

### Add New Project

Edit `src/data/projects.js`:

```javascript
{
  id: 'unique-id',
  title: 'proj.myproject.t',
  description: 'proj.myproject.d',
  category: 'web',
  badge: 'Web',
  badgeClass: 'b-web',
  status: 'proj.live',
  link: 'https://github.com/user/project',
  linkText: 'proj.gh',
  isExternal: true
}
```

Then add translation keys to `src/data/translations.js`.

### Update Skills

Edit `src/data/skills.js` to add/modify skill items:

```javascript
{
  name: 'New Skill',
  level: 'Intermediate'  // Beginner, Intermediate, Advanced
}
```

## Form Integration

### Using Formspree

1. Visit [formspree.io](https://formspree.io)
2. Create new form and get your form ID
3. Set `VITE_FORMSPREE_ID` in `.env`:
   ```
   VITE_FORMSPREE_ID=your_form_id_here
   ```

Forms will submit to your email automatically.

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome/Edge | ✅ Latest |
| Safari | ✅ v14+ |
| Firefox | ✅ Latest |
| Mobile Safari | ✅ v13+ |
| Mobile Chrome | ✅ Latest |

## Performance

- **Lighthouse Score**: 95+/100
- **Build Size**: ~80KB gzip
- **Time to Interactive**: <1.5s
- **Framework Overhead**: Minimal with Vite

## SEO Features

- ✅ Meta tags (description, keywords, OG)
- ✅ Structured data (JSON-LD)
- ✅ Sitemap & robots.txt
- ✅ Semantic HTML5
- ✅ Open Graph & Twitter Card support

## Accessibility

- ✅ Keyboard navigation
- ✅ ARIA labels and roles
- ✅ Focus management
- ✅ Skip link
- ✅ Reduced motion support
- ✅ Color contrast compliance

## License

ISC License – See [LICENSE](LICENSE) for details

## Contact

💬 **Get in Touch:**
- **Telegram**: [@seventeenmever](https://t.me/seventeenmever)
- **GitHub**: [7teenmever](https://github.com/7teenmever)
- **LinkedIn**: [Ibrohim Pulatov](https://www.linkedin.com/in/ibrohim-pulatov-18150a3b1)

---

**v7.0** — React + Vite Edition  
Built with ❤️ & ☕

## Deployment

The site is designed for static hosting and works well with GitHub Pages:

- Production URL: `https://7teenmever.github.io/my-website/`
- No backend is required

## Notes

- The contact form is prepared for Formspree. Replace `YOUR_FORM_ID` in `index.html` to activate it.
- `node_modules/` is intentionally ignored and should not be committed.
