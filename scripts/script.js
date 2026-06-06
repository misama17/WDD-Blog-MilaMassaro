const checkboxes = document.querySelectorAll('input[type="checkbox"]');

function updateState() {
  const checked = document.querySelectorAll('input[type="checkbox"]:checked');

  checkboxes.forEach(cb => {
    cb.disabled = false;
    cb.parentElement.classList.remove('is-disabled');
  });

  if (checked.length >= 2) {
    checkboxes.forEach(cb => {
      if (!cb.checked) {
        cb.disabled = true;
        cb.parentElement.classList.add('is-disabled');
      }
    });
  }
}

checkboxes.forEach(cb => {
  cb.addEventListener('change', () => {
    const checked = document.querySelectorAll('input[type="checkbox"]:checked');

    if (checked.length > 2) {
      cb.checked = false; 
    }

    updateState();
  });
});





const container = document.querySelector('.iframe-container');
const iframe = document.querySelector('.iframe-css');

document.querySelectorAll('.iframe-container').forEach(container => {
  const iframe = container.querySelector('iframe');
  new ResizeObserver(() => {
    iframe.style.transform = `scale(${container.offsetWidth / 1280})`;
  }).observe(container);
});