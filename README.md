# Doruk's Protein Tracker 🇨🇭

A sleek, modern protein tracking app for Swiss fitness enthusiasts. Track protein deals from Migros, Coop, Lidl, and Aldi with smart scoring algorithms.

## Features

- 📊 Smart scoring algorithm (protein/CHF, taste, calories)
- 💾 Local storage - your data stays on your device
- 📱 Responsive design for mobile and desktop
- 🎯 Daily protein goal tracking
- 📤 Export/Import data as JSON
- 🌙 Dark/Light theme support
- ✨ Beautiful, modern UI

## Deploy Your Own

### Quick Deploy

1. Fork this repository
2. Clone to your local machine:
```bash
git clone https://github.com/[your-username]/protein-tracker.git
cd protein-tracker
```

3. Install dependencies (optional, for local server):
```bash
npm install
```

4. Run locally:
```bash
npm start
```

5. Deploy to your subdomain:
   - Upload files to your web server
   - Point subdomain to the folder
   - No backend required!

### Hosting Options

- **GitHub Pages**: Free, easy deployment
- **Netlify**: Free tier with custom domain
- **Vercel**: Great for static sites
- **Your own server**: Just upload the files

## Technology

- Pure JavaScript (no framework dependencies)
- Local Storage API for data persistence
- Modern CSS with CSS Grid and Flexbox
- Responsive design
- PWA-ready

## Data Storage

All data is stored locally in your browser using localStorage. No server, no database, no tracking.

## Customization

Edit these files to customize:
- `app.js` - Modify scoring algorithm
- `styles.css` - Change colors and design
- `index.html` - Update branding

## License

MIT - Feel free to use for your own protein tracking!

---

Made with 💪 by Doruk | [doruk.ch](https://doruk.ch)