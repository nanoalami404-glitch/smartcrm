# Smart CRM for Small Businesses

A simple, fast, and "smart" CRM designed for freelancers and small businesses. Built with static HTML, CSS, and Vanilla JavaScript, optimized for GitHub Pages.

## Features

- **Dashboard**: KPI overview and recent activity feed.
- **Contacts**: Manage leads and customers (CRUD-like operations with LocalStorage).
- **Pipeline**: Kanban-style drag-and-drop deal management.
- **Analytics**: Visual sales performance reports.
- **Settings**: Theme toggle (Light/Dark mode) and preferences.

## Tech Stack

- **Frontend**: HTML5, CSS3 (Modern Variables & Flexbox/Grid), Vanilla JavaScript.
- **Data**: Browser `localStorage` (No backend required).
- **Styling**: Custom Design System (no heavy frameworks like Bootstrap).

## Quick Start (How to Run)

Because this project uses modern JavaScript Modules (`import`/`export`), **you cannot just double-click `index.html`**. You must use a local server.

### Option A: Using Python (Simplest)
1. Open your terminal/command prompt.
2. Navigate to this folder: `cd c:\Users\alanm\OneDrive\Documents\sass`
3. Run:
   ```bash
   python -m http.server
   ```
4. Open your browser to `http://localhost:8000`

### Option B: Using Node.js
1. Run:
   ```bash
   npm start
   ```
   (This will run `npx serve .`)

### Option C: VS Code
1. Install the "Live Server" extension.
2. Right-click `index.html` -> "Open with Live Server".

## Deployment
1. Push to GitHub.
2. Enable GitHub Pages for the root directory.

## Folder Structure

```
/
├── index.html          # Landing Page
├── login.html
├── register.html
├── app/                # Application Pages
│   ├── dashboard.html
│   ├── contacts.html
│   ├── pipeline.html
│   ├── analytics.html
│   └── settings.html
├── assets/
    ├── css/            # Styles
    ├── js/             # Logic (Store, App)
    └── images/
```

## License

MIT
