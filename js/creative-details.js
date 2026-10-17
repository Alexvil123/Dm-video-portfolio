/* Image-only creative studies. Original assets and future video hooks stay intact. */
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('projects-grid');
  const cards = [...grid.querySelectorAll('.project-card')];
  const lightbox = document.getElementById('image-lightbox');
  const moods = ['original', 'cinematic', 'clean', 'bold'];
  const treatments = { original: 'none', cinematic: 'contrast(1.12) saturate(.82) sepia(.14)', clean: 'brightness(1.07) contrast(.97) saturate(.9)', bold: 'contrast(1.2) saturate(1.35)' };
  const studies = [
    { note: 'The curve of the road leads the eye straight to the car. Warm sunset tones against cool water make the subject feel sculpted, while the low framing gives the scene momentum.', palette: ['#24363F', '#607F88', '#BFA17F', '#E9C995'], position: '62% 65%' },
    { note: 'A close expression carries the story. Warm practical lights create depth behind the subject, and the microphone in the foreground gives the conversation a sense of place.', palette: ['#211C19', '#72553D', '#BE9166', '#EBD4AD'], position: '65% 35%' },
    { note: 'The subject anchors a busy city frame. Strong vertical lines, layered signs and a tighter crop turn everyday street detail into a graphic fashion composition.', palette: ['#182137', '#6A3D75', '#BB607E', '#DDD3CD'], position: '55% 28%' },
    { note: 'Small details do the storytelling here: the surface of the coffee, the light on the cup and the texture of the table. A close crop makes an ordinary ritual feel considered.', palette: ['#2C211B', '#72503A', '#BC9165', '#E9DAC2'], position: '55% 65%' },
    { note: 'Let the lights become part of the composition. Deep shadows hold the frame together while the saturated highlights create the energy and atmosphere of a live performance.', palette: ['#181329', '#49316E', '#A84FAD', '#8DB4DB'], position: '65% 40%' },
    { note: 'The reflection creates a second horizon. Keeping the water and mountain peaks in balance gives the frame its stillness; a closer crop reveals the rock and snow textures.', palette: ['#173D4C', '#537E80', '#9D9C91', '#E8DCC8'], position: '50% 32%' }
  ];
  let galleryMood = 'original';
  let activeCard = null;
  const summaries = [
    'Coastal light, sculpted details and a sense of speed.',
    'Warm light and close-up storytelling for a creator conversation.',
    'Streetwear, city textures and bold visual rhythm.',
    'A quiet coffee ritual, seen through texture and light.',
    'Electric colour and the atmosphere of a live performance.',
    'Mountain reflections, open space and cinematic stillness.'
  ];
  const titleCase = value => value[0].toUpperCase() + value.slice(1);
  const applyCard = card => {
    const mood = galleryMood === 'original' ? 'cinematic' : galleryMood;
    card.style.setProperty('--grade-filter', treatments[mood]);
    const toggle = card.querySelector('.grade-toggle');
    const on = card.classList.contains('grade-on');
    toggle.setAttribute('aria-pressed', String(on));
    toggle.textContent = on ? 'Show original' : 'Preview grade';
    const status = card.querySelector('.grade-caption');
    status.textContent = `${titleCase(mood)} preview`;
  };
  cards.forEach((card, index) => {
    const media = card.querySelector('.project-image');
    const number = document.createElement('span');
    number.className = 'sheet-number';
    number.textContent = `${String(index + 1).padStart(2, '0')} / SELECTED FRAME`;
    number.setAttribute('aria-hidden', 'true');
    card.prepend(number);
    const status = document.createElement('span');
    status.className = 'grade-caption'; status.setAttribute('aria-hidden', 'true');
    media.append(status);
    const tools = document.createElement('div'); tools.className = 'frame-tools';
    const helper = document.createElement('span'); helper.textContent = 'Original ↔ Creative grade';
    const toggle = document.createElement('button'); toggle.type = 'button'; toggle.className = 'grade-toggle';
    toggle.setAttribute('aria-label', 'Toggle creative grade for ' + card.querySelector('.project-title').textContent.trim());
    tools.append(helper, toggle);
    card.querySelector('.card-media-wrapper').after(tools);
    toggle.addEventListener('click', () => { card.classList.toggle('grade-on'); applyCard(card); });
    const summary = document.createElement('p'); summary.className = 'project-summary';
    summary.textContent = summaries[index];
    card.querySelector('.project-desc').before(summary);
    applyCard(card);
  });
  document.querySelectorAll('[data-gallery-mood]').forEach(button => {
    button.addEventListener('click', () => {
      galleryMood = button.dataset.galleryMood;
      document.querySelectorAll('[data-gallery-mood]').forEach(option => option.setAttribute('aria-pressed', String(option === button)));
      cards.forEach(card => { card.classList.toggle('grade-on', galleryMood !== 'original'); applyCard(card); });
    });
  });
  const setProjectMood = mood => {
    if (!moods.includes(mood)) return;
    const filter = treatments[mood];
    document.getElementById('image-lightbox-photo').style.filter = filter;
    lightbox.querySelectorAll('.detail-crop img').forEach(img => { img.style.filter = filter; });
    lightbox.querySelectorAll('[data-project-mood]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.projectMood === mood)));
    document.getElementById('mood-readout').textContent = mood === 'original' ? 'Original image' : titleCase(mood) + ' · creative colour preview';
  };
  lightbox.querySelectorAll('[data-project-mood]').forEach(button => button.addEventListener('click', () => setProjectMood(button.dataset.projectMood)));
  document.querySelectorAll('.open-image-btn').forEach(trigger => {
    trigger.addEventListener('click', () => {
      activeCard = trigger.closest('.project-card');
      const hasVideo = Boolean(trigger.dataset.video || activeCard?.dataset.video);
      const board = document.getElementById('project-moodboard');
      document.getElementById('lightbox-moods').hidden = hasVideo;
      board.hidden = !activeCard || hasVideo;
      setProjectMood(activeCard?.classList.contains('grade-on') ? (galleryMood === 'original' ? 'cinematic' : galleryMood) : 'original');
      if (!activeCard || hasVideo) return;
      const study = studies[cards.indexOf(activeCard)];
      const title = activeCard.querySelector('.project-title').textContent.trim();
      const composition = document.getElementById('moodboard-composition');
      const texture = document.getElementById('moodboard-texture');
      composition.src = texture.src = trigger.dataset.image;
      composition.alt = 'Composition crop of ' + title;
      texture.alt = 'Detail crop of ' + title;
      texture.style.objectPosition = study.position;
      document.getElementById('moodboard-note').textContent = study.note;
      const palette = document.getElementById('project-palette'); palette.replaceChildren();
      study.palette.forEach(colour => {
        const swatch = document.createElement('div'); swatch.className = 'palette-swatch'; swatch.setAttribute('role', 'listitem');
        const chip = document.createElement('span'); chip.style.backgroundColor = colour; chip.setAttribute('aria-hidden', 'true');
        const hex = document.createElement('span'); hex.textContent = colour;
        swatch.append(chip, hex); palette.append(swatch);
      });
    });
  });
});
