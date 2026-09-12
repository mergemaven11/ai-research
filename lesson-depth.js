(() => {
  const TOTAL_LESSONS = 10;
  let enhancing = false;

  const weekNumber = () => {
    const match = location.hash.match(/^#week-(\d+)$/);
    return match ? Number(match[1]) : null;
  };

  const lessonKey = (week, index) => `ai-course:w${week}:lesson${index}`;
  const isDone = (week, index) => localStorage.getItem(lessonKey(week, index)) === 'done';
  const allTenDone = (week) => Array.from({ length: TOTAL_LESSONS }, (_, index) => isDone(week, index)).every(Boolean);

  function extraLessons(title, summary, outcomes) {
    const outcomeA = outcomes[0] || `Explain the core idea behind ${title}`;
    const outcomeB = outcomes[1] || `Recognize the important boundaries in ${title}`;
    const outcomeC = outcomes[2] || `Test ${title} with evidence`;

    return [
      {
        title: 'Map the system visually',
        plain: `Before memorizing details, draw the moving parts of ${title} and show how information travels between them.`,
        deep: `${summary} Turn that description into an input → transformation → output map, then point to where evidence is created.`,
        points: ['Name the input', 'Trace the transformation', 'Name the output and evidence']
      },
      {
        title: 'Vocabulary, assumptions & boundaries',
        plain: 'Technical words are useful only when you know exactly what they mean and where they stop applying.',
        deep: `Use this lesson to connect the week’s vocabulary to two goals: “${outcomeA}” and “${outcomeB}.” Write each term in plain English, then add one assumption or boundary beside it.`,
        points: ['Define terms simply', 'State assumptions', 'Mark system boundaries']
      },
      {
        title: 'Failure modes: what can go wrong?',
        plain: 'Understanding the happy path is not enough. Strong engineers can predict how the system fails.',
        deep: `List at least three realistic failure modes for ${title}. For each one, identify the signal you would observe, the likely cause, and a test that could reproduce it.`,
        points: ['Failure → signal', 'Signal → likely cause', 'Cause → reproducible test']
      },
      {
        title: 'Build the smallest useful version',
        plain: 'Build a tiny version first so every moving part is visible and easy to debug.',
        deep: 'Use the week’s lab as the target, but reduce it to the smallest end-to-end slice that proves the concept. Keep the inputs small, the output inspectable, and the run repeatable.',
        points: ['Small input', 'One complete path', 'Save evidence from the run']
      },
      {
        title: 'Break it on purpose',
        plain: 'Now attack your own build with edge cases instead of waiting for users to discover them.',
        deep: `Create at least three adversarial or awkward cases for ${title}. Change one condition at a time so you can explain why behavior changed instead of guessing.`,
        points: ['Add edge cases', 'Change one condition', `Measure: ${outcomeC}`]
      },
      {
        title: 'Fix, harden & retest',
        plain: 'A fix is not finished until the failing case becomes a repeatable passing test.',
        deep: 'Choose the highest-value failure you found, make one targeted improvement, and rerun both the failing case and your original baseline. Confirm the fix did not create a new regression.',
        points: ['Target one failure', 'Retest the baseline', 'Record before vs after']
      },
      {
        title: 'Explain it back without notes',
        plain: 'If you can teach the idea clearly, you probably understand it. If you get stuck, you found the next thing to review.',
        deep: `Give yourself a two-minute teach-back of ${title}: what problem it solves, how the system works, one failure mode, one measurement, and one design decision you would defend.`,
        points: ['Problem → system', 'Failure → measurement', 'Decision → reason']
      }
    ];
  }

  function buildLessonCard(week, lesson, index) {
    const section = document.createElement('section');
    section.className = 'content-card supplemental-lesson';
    section.id = `lesson-${index}`;
    section.innerHTML = `
      <p class="eyebrow">Lesson ${index + 1} of ${TOTAL_LESSONS}</p>
      <h2>${lesson.title}</h2>
      <div class="plain-english"><strong>Plain English:</strong> ${lesson.plain}</div>
      <h3>Go deeper</h3>
      <p>${lesson.deep}</p>
      <div class="key-points">${lesson.points.map(point => `<div class="key-point">${point}</div>`).join('')}</div>
      <div class="hero-actions">
        <button class="text-button depth-lesson-complete" type="button" data-depth-lesson="${index}">${isDone(week, index) ? '✓ Lesson complete' : 'Mark lesson complete'}</button>
      </div>`;
    return section;
  }

  function updateDashboardCount() {
    const stats = document.querySelectorAll('#dashboard-view .stat-card');
    if (stats.length >= 2) {
      const strong = stats[1].querySelector('strong');
      const label = stats[1].querySelector('span');
      if (strong) strong.textContent = '120';
      if (label) label.textContent = 'guided lessons';
    }
  }

  function updateLockedCopy(lessonView) {
    lessonView.querySelectorAll('.locked-card').forEach(card => {
      if (card.querySelector('h2')?.textContent.includes('Lab locked')) {
        const p = card.querySelector('p');
        if (p) p.textContent = 'Complete all 10 lessons and pass the knowledge check first. The lab comes after the learning—not before it.';
      }
    });
  }

  function enhanceWeek() {
    if (enhancing) return;
    const week = weekNumber();
    const lessonView = document.querySelector('#lesson-view');
    if (!week || !lessonView || lessonView.hidden) {
      updateDashboardCount();
      return;
    }

    const lessonContent = lessonView.querySelector('.lesson-content');
    const visual = lessonView.querySelector('#visuals');
    const coreCards = lessonContent ? [...lessonContent.querySelectorAll(':scope > .content-card:not(.supplemental-lesson)')] : [];
    if (!lessonContent || !visual || coreCards.length < 3) return;

    coreCards.forEach((card, index) => {
      const eyebrow = card.querySelector('.eyebrow');
      if (eyebrow) eyebrow.textContent = `Lesson ${index + 1} of ${TOTAL_LESSONS}`;
    });
    updateLockedCopy(lessonView);

    const existingExtras = lessonContent.querySelectorAll(':scope > .supplemental-lesson');
    if (existingExtras.length === 7) return;

    enhancing = true;
    try {
      existingExtras.forEach(node => node.remove());
      const title = lessonView.querySelector('.lesson-title-card h1')?.textContent?.trim() || `Week ${week}`;
      const summary = lessonView.querySelector('.lesson-title-card p')?.textContent?.trim() || '';
      const outcomes = [...lessonView.querySelectorAll('.outcomes-card li')].map(li => li.textContent.trim());
      const extras = extraLessons(title, summary, outcomes);

      extras.forEach((lesson, offset) => {
        visual.before(buildLessonCard(week, lesson, offset + 3));
      });

      const firstRail = lessonView.querySelector('.lesson-rail .rail-card .rail-nav');
      if (firstRail) {
        firstRail.querySelectorAll('[data-depth-scroll]').forEach(node => node.remove());
        const visualButton = firstRail.querySelector('[data-scroll="visuals"]');
        extras.forEach((lesson, offset) => {
          const index = offset + 3;
          const button = document.createElement('button');
          button.type = 'button';
          button.dataset.depthScroll = `lesson-${index}`;
          button.textContent = `${index + 1}. ${lesson.title}`;
          if (visualButton) firstRail.insertBefore(button, visualButton); else firstRail.appendChild(button);
        });
      }
    } finally {
      enhancing = false;
    }
  }

  document.addEventListener('click', (event) => {
    const depthButton = event.target.closest('[data-depth-lesson]');
    if (depthButton) {
      const week = weekNumber();
      if (!week) return;
      const index = Number(depthButton.dataset.depthLesson);
      const key = lessonKey(week, index);
      if (isDone(week, index)) localStorage.removeItem(key); else localStorage.setItem(key, 'done');
      depthButton.textContent = isDone(week, index) ? '✓ Lesson complete' : 'Mark lesson complete';
      return;
    }

    const scrollButton = event.target.closest('[data-depth-scroll]');
    if (scrollButton) {
      document.getElementById(scrollButton.dataset.depthScroll)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  document.addEventListener('click', (event) => {
    const checkButton = event.target.closest('#check-answer');
    if (!checkButton) return;
    const week = weekNumber();
    if (!week || allTenDone(week)) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    const feedback = document.querySelector('#quiz-feedback');
    if (feedback) {
      feedback.hidden = false;
      feedback.className = 'quiz-feedback bad';
      feedback.textContent = 'Finish all 10 lesson sections first. The knowledge check comes after the full learning sequence.';
    }
  }, true);

  const observer = new MutationObserver(() => {
    if (enhancing) return;
    queueMicrotask(enhanceWeek);
  });

  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener('hashchange', () => queueMicrotask(enhanceWeek));
  queueMicrotask(enhanceWeek);
})();