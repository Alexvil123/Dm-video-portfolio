# 🎬 Studio Cuts — Creative Video Editor Portfolio (Light Theme)

A world-class, ultra-modern **Light Theme Portfolio** designed specifically for **Video Editors, Colorists, and Motion Designers**.

---

## ✨ Features Built Specifically For You

1. **Light Theme Aesthetics**:
   - Clean, editorial, high-end design using subtle glassmorphism, soft shadows, and light backgrounds.
   - Ultra-professional typography using Google Fonts (**Outfit**, **Plus Jakarta Sans**, and **JetBrains Mono** for timecodes).

2. **Video Watermark & Preview System (As requested)**:
   - High-definition cinematic image frames fitted into 16:9 and 9:16 video containers.
   - Distinct video watermarks:
     - `[▶ VIDEO PREVIEW // SAMPLE WATERMARK]` badge overlaid on every frame.
     - `● REC` live red pulsing record indicator and timecode (`00:30 / 00:45`).
     - Custom diagonal `VIDEO PREVIEW` ribbon banner.
     - Animated audio equalizer bars (` ▂▃▅▆ `) on hover.

3. **Interactive Simulated Video Player Modal**:
   - Clicking **"Watch Showreel"** or any video card pops open a full video player modal!
   - Real interactive play/pause toggle, scrubbing timeline slider, 5s rewind/forward, timecode tracker, and volume toggle.
   - Built-in helper to copy HTML `<video>` embed snippet.

4. **Interactive Before & After Color Grading Slider**:
   - A live draggable comparison slider showcasing **RAW S-Log3 flat camera footage** vs **Final Graded Rec.709 footage**.
   - Visitors can slide left and right to inspect your colorist skills!

5. **Category Filter Tabs**:
   - *All Projects (6)*
   - *Commercial & Ads (1)*
   - *YouTube & Narrative (1)*
   - *Vertical Reels / Shorts (2)*
   - *Cinematic & Music (2)*

6. **Full Production & Client Pipeline**:
   - Software stack strip (Premiere Pro, After Effects, DaVinci Resolve, Audition, Blender, Topaz AI).
   - 4-Stage Post-Production Pipeline.
   - Transparent Pricing Packages & Turnaround times.
   - Project Inquiry & Booking Form.

---

## Deploy on Vercel

Import `Alexvil123/Dm-video-portfolio` from GitHub and deploy the `main` branch.
Keep the Root Directory at the repository root (`./`). The included
`vercel.json` configures this as a static HTML/CSS/JavaScript website with no
install or build command and serves files from the repository root.
`server.js` is only for local preview; Vercel serves the static website directly.

If the repository is missing from Vercel's import list, update the Vercel
GitHub App's repository access to include `Dm-video-portfolio`, then refresh
the import page.

## 🚀 How to Run the Website Locally

You already have the local server running at:
```bash
http://localhost:3000
```

To run it anytime via PowerShell / Terminal:
```bash
node server.js
```
Then open `http://localhost:3000` or double-click `index.html` in your browser!

---

## 🎥 How to Replace Preview Images with Real Videos

Whenever you have real videos ready (.mp4 files or YouTube embeds):

### 1. For Local MP4 Video Files:
In [index.html](file:///e:/Dm%20vdo%20portfolio/index.html), replace the `<img>` tag inside any `.video-container` with:
```html
<video src="assets/videos/your_video.mp4" controls playsinline poster="assets/images/thumbnail.jpg" style="width: 100%; height: 100%; object-fit: cover;"></video>
```

### 2. For YouTube / Vimeo Embeds:
Replace with:
```html
<iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID?rel=0" frameborder="0" allowfullscreen style="width: 100%; aspect-ratio: 16/9; border: none;"></iframe>
```
