const boxes = document.querySelectorAll('[data-progress]');

for (const box of boxes) {
  const key = `ai-research:${box.dataset.progress}`;
  box.checked = localStorage.getItem(key) === 'done';

  box.addEventListener('change', () => {
    if (box.checked) {
      localStorage.setItem(key, 'done');
    } else {
      localStorage.removeItem(key);
    }
  });
}
