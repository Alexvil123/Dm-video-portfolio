const frameDialog = document.getElementById('frame-dialog');
const frameImage = document.getElementById('frame-image');
document.querySelectorAll('[data-frame]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const title = link.dataset.title;
    frameImage.src = link.href;
    frameImage.alt = title;
    document.getElementById('frame-title').textContent = title;
    document.getElementById('frame-original').href = link.href;
    frameDialog.showModal();
    document.body.style.overflow = 'hidden';
  });
});
document.getElementById('close-frame').addEventListener('click', () => frameDialog.close());
frameDialog.addEventListener('close', () => { document.body.style.overflow = ''; });
frameDialog.addEventListener('click', event => {
  const bounds = frameDialog.getBoundingClientRect();
  if (event.target === frameDialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) frameDialog.close();
});
