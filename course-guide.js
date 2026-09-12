(() => {
  const dialog = document.getElementById('course-guide-dialog');
  if (!dialog) return;

  const openGuide = () => {
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  };

  const closeGuide = () => {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  };

  function polishSyllabusLinks(root = document) {
    root.querySelectorAll('a[href="docs/lesson-plan.md"]').forEach((link) => {
      if (link.closest('noscript')) return;
      link.textContent = 'Explore course guide';
      link.href = '#course-guide';
      link.classList.add('course-guide-launcher');
      link.setAttribute('role', 'button');
      link.dataset.openCourseGuide = '';
    });
  }

  document.addEventListener('click', (event) => {
    const openButton = event.target.closest('[data-open-course-guide]');
    if (openButton) {
      event.preventDefault();
      openGuide();
      return;
    }

    const closeButton = event.target.closest('[data-close-course-guide]');
    if (closeButton) {
      event.preventDefault();
      closeGuide();
    }
  });

  dialog.addEventListener('click', (event) => {
    const box = dialog.getBoundingClientRect();
    const outside = event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
    if (outside) closeGuide();
  });

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) polishSyllabusLinks(node);
      });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  polishSyllabusLinks();
})();