(() => {
  const PREFIX = 'ai-course:';
  const resetButton = document.getElementById('reset-progress');
  if (!resetButton) return;

  resetButton.addEventListener('click', () => {
    const confirmed = window.confirm(
      'Reset all AI Research Lab progress on this device? This removes completed lessons, quizzes, labs, homework, and your selected week.'
    );
    if (!confirmed) return;

    Object.keys(localStorage)
      .filter((key) => key.startsWith(PREFIX))
      .forEach((key) => localStorage.removeItem(key));

    const toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = 'Progress cleared. Starting fresh.';
      toast.hidden = false;
    }

    history.replaceState(null, '', '#dashboard');
    window.setTimeout(() => window.location.reload(), 350);
  });
})();