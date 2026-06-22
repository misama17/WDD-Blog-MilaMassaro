const container = document.querySelector('.iframe-container');
const iframe = document.querySelector('.iframe-css');

// Claude: hoe zorg ik ervoor dat mijn iframe een vast formaat heeft?
document.querySelectorAll('.iframe-container').forEach(container => {
  const iframe = container.querySelector('iframe');
  new ResizeObserver(() => {
    iframe.style.transform = `scale(${container.offsetWidth / 1280})`;
  }).observe(container);
});