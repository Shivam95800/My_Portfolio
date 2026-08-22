# Shivam Soni — Data Science & Software Engineering Portfolio

A modern, high-performance personal portfolio website built with a **Python Notebook & Data Science dark theme**.

![Preview](assets/profile.jpg)

---

## ⚡ Key Highlights
- **Terminal Hero Window**: Interactive code typewriter cycling through DS actions (`ds.build_models()`, `ds.clean_data()`, `ds.solve(110, 'leetcode')`).
- **Interactive Ambient Network**: Dynamic HTML5 canvas node graph simulating interconnected data points with full `prefers-reduced-motion` support.
- **Python REPL Aesthetic**: REPL eyebrows (`>>> about`, `>>> skills`) and dataset `dtype:` labeled skill cards.
- **Milestone Timelines**: Vertical timeline nodes with amber accent rings.
- **Zero Build Step**: Pure HTML5, CSS3 (Custom Properties & Glassmorphism), and Vanilla JavaScript (ES6+).

---

## 📁 Project Structure

```text
shivam-portfolio/
├── index.html              # Main HTML document
├── css/
│   └── style.css          # Design system tokens, layouts, animations & responsive queries
├── js/
│   └── main.js           # Particle network canvas, typewriter loop, mobile menu & scroll reveal
├── assets/
│   ├── profile.jpg        # Profile image (replace with your photo anytime)
│   └── resume.pdf         # Resume PDF document
└── README.md              # Project documentation & deployment guide
```

---

## 🚀 How to Run Locally

Because this project uses vanilla HTML/CSS/JS with no dependencies:

1. **Direct browser open**: Simply double-click `index.html` or open it with your web browser.
2. **Local HTTP Server (Recommended)**:
   ```bash
   # Using Python
   python -m http.server 8000
   # Then visit http://localhost:8000 in your browser
   ```
   or with VS Code / Antigravity Live Server extension.

---

## 🌐 Deployment Guide

### Option 1: Deploy to Vercel (Recommended — 2 Minutes)
1. Initialize Git and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   ```
2. Push to GitHub:
   - Create a new GitHub repository (e.g. `shivam-portfolio`).
   - Push your code:
     ```bash
     git remote add origin https://github.com/Shivam95800/shivam-portfolio.git
     git branch -M main
     git push -u origin main
     ```
3. Deploy on Vercel:
   - Go to [vercel.com](https://vercel.com) and log in with GitHub.
   - Click **"Add New Project"** -> **"Import"** your `shivam-portfolio` repo.
   - Leave default settings (Framework Preset: *Other*) and click **Deploy**.
   - Your portfolio will be live at `https://shivam-portfolio.vercel.app`!

### Option 2: Deploy to GitHub Pages
1. Push your repository to GitHub as shown above.
2. In your repository on GitHub, go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
4. Select `main` branch and `/ (root)` folder, then click **Save**.
5. Your website will be live in 1-2 minutes at `https://Shivam95800.github.io/shivam-portfolio/`.

---

## 📝 Customization & Asset Updates
- **Profile Photo**: Place your actual image in `assets/profile.jpg` (1:1 square aspect ratio recommended).
- **Resume**: Replace `assets/resume.pdf` with your up-to-date resume.
- **Social & Project Links**: Update `index.html` with your latest live project links.

---

© 2026 Shivam Soni. Built with precision.
