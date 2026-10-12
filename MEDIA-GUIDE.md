# Images now, videos later

All hero tiles and gallery projects display the existing images. No video is
required. Clicking a gallery image opens a larger preview with its description,
creative techniques, and software. The original blue/purple light theme stays.

## Add a project video later

1. Put your MP4 file in `assets/videos/` (create that folder when needed).
2. In `index.html`, find the project's `<article class="project-card ...">`.
3. Set its empty `data-video` attribute to your file path:

```html
<article class="project-card card-span-7"
  data-category="commercial"
  data-video="assets/videos/commercial.mp4">
```

Both the project image and its Explore project button will open that video.
The existing image becomes the poster; keep `data-image` and the `<img>` intact.
Playback starts when the visitor presses Play, and stops when the preview closes.
If the video fails to load, the image remains available with a short message.

## Add a hero video later

Each hero image button also has an empty `data-video` attribute. Fill it with
the MP4 path. The tile stays an image poster; clicking opens the video player.

```html
<button class="image-tile image-tile-main open-image-btn"
  data-video="assets/videos/showreel.mp4"
  data-image="assets/images/hero_showreel.jpg"
  data-title="My showreel">
```

Direct HTTPS MP4 URLs also work. YouTube/Vimeo page links require an embed player
and should not be put in `data-video`.

Leave `data-video=""` for image-only projects. No JavaScript edits are needed.
The color comparison section keeps its still images so the draggable comparison
remains usable.
