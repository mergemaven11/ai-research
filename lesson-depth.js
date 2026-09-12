(() => {
  const TOTAL_LESSONS = 10;
  const LAB_COUNTS = [5, 4, 4, 4, 4, 4, 5, 5, 4, 5, 5, 5];
  const HOMEWORK_COUNT = 3;
  let enhancing = false;

  const weekNumber = () => {
    const match = location.hash.match(/^#week-(\d+)$/);
    return match ? Number(match[1]) : null;
  };

  const progressKey = (week, type, index = '') => `ai-course:w${week}:${type}${index}`;
  const isDone = (week, index) => localStorage.getItem(progressKey(week, 'lesson', index)) === 'done';
  const quizPassed = (week) => localStorage.getItem(progressKey(week, 'quiz')) === 'passed';
  const labDone = (week, index) => localStorage.getItem(progressKey(week, 'lab', index)) === 'done';
  const homeworkDone = (week, index) => localStorage.getItem(progressKey(week, 'homework', index)) === 'done';
  const allTenDone = (week) => Array.from({ length: TOTAL_LESSONS }, (_, index) => isDone(week, index)).every(Boolean);

  function fullWeekProgress(week) {
    const lessonCount = Array.from({ length: TOTAL_LESSONS }, (_, index) => isDone(week, index)).filter(Boolean).length;
    const labCount = Array.from({ length: LAB_COUNTS[week - 1] }, (_, index) => labDone(week, index)).filter(Boolean).length;
    const homeworkCount = Array.from({ length: HOMEWORK_COUNT }, (_, index) => homeworkDone(week, index)).filter(Boolean).length;
    const total = TOTAL_LESSONS + 1 + LAB_COUNTS[week - 1] + HOMEWORK_COUNT;
    const done = lessonCount + (quizPassed(week) ? 1 : 0) + labCount + homeworkCount;
    return Math.round((done / total) * 100);
  }

  function fullCourseProgress() {
    return Math.round(Array.from({ length: 12 }, (_, index) => fullWeekProgress(index + 1)).reduce((a, b) => a + b, 0) / 12);
  }

  function setText(node, value) {
    if (node && node.textContent !== String(value)) node.textContent = String(value);
  }

  function setWidth(node, value) {
    if (node && node.style.width !== value) node.style.width = value;
  }

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

  function patchProgress() {
    const overall = fullCourseProgress();
    setText(document.querySelector('#header-progress-label'), `${overall}%`);
    setWidth(document.querySelector('#header-progress-bar'), `${overall}%`);

    const stats = document.querySelectorAll('#dashboard-view .stat-card');
    if (stats.length >= 4) {
      setText(stats[1].querySelector('strong'), '120');
      setText(stats[1].querySelector('span'), 'guided lessons');
      const completedWeeks = Array.from({ length: 12 }, (_, index) => fullWeekProgress(index + 1)).filter(value => value === 100).length;
      setText(stats[2].querySelector('strong'), `${completedWeeks}/12`);
      setText(stats[3].querySelector('strong'), `${overall}%`);
    }

    document.querySelectorAll('#dashboard-view .module-card').forEach((card, moduleIndex) => {
      const startWeek = moduleIndex * 3 + 1;
      const average = Math.round((fullWeekProgress(startWeek) + fullWeekProgress(startWeek + 1) + fullWeekProgress(startWeek + 2)) / 3);
      setText(card.querySelector('.module-card-head > strong'), `${average}%`);
    });

    document.querySelectorAll('#dashboard-view .week-row[data-week]').forEach(row => {
      const week = Number(row.dataset.week);
      setText(row.querySelector('.week-row-meta strong'), `${fullWeekProgress(week)}%`);
    });

    document.querySelectorAll('.week-link[data-week]').forEach(link => {
      const week = Number(link.dataset.week);
      link.querySelector('.week-status')?.classList.toggle('complete', fullWeekProgress(week) === 100);
    });

    const week = weekNumber();
    if (week) {
      const progress = fullWeekProgress(week);
      setText(document.querySelector('#lesson-view .lesson-progress .header-progress-copy strong'), `${progress}%`);
      setWidth(document.querySelector('#lesson-view .lesson-progress .progress-track span'), `${progress}%`);
      patchLearningPath(week);
    }
  }

  function patchLearningPath(week) {
    const items = document.querySelectorAll('#lesson-view .learning-path li');
    if (items.length < 4) return;
    const lessonsDone = allTenDone(week);
    const quizDone = quizPassed(week);
    const labsDone = Array.from({ length: LAB_COUNTS[week - 1] }, (_, index) => labDone(week, index)).every(Boolean);
    const homeworkFinished = Array.from({ length: HOMEWORK_COUNT }, (_, index) => homeworkDone(week, index)).every(Boolean);

    items.forEach(item => item.classList.remove('done', 'current'));
    items[0].classList.add(lessonsDone ? 'done' : 'current');
    if (lessonsDone) items[1].classList.add(quizDone ? 'done' : 'current');
    if (lessonsDone && quizDone) items[2].classList.add(labsDone ? 'done' : 'current');
    if (lessonsDone && quizDone && labsDone) items[3].classList.add(homeworkFinished ? 'done' : 'current');
  }

  function updateLockedCopy(lessonView, week) {
    lessonView.querySelectorAll('.locked-card').forEach(card => {
      if (card.querySelector('h2')?.textContent.includes('Lab locked')) {
        const p = card.querySelector('p');
        const message = 'Complete all 10 lessons and pass the knowledge check first. The lab comes after the learning—not before it.';
        if (p && p.textContent !== message) p.textContent = message;
      }
    });

    if (!allTenDone(week)) {
      lessonView.querySelectorAll('[data-lab], [data-homework]').forEach(input => {
        input.disabled = true;
        input.title = 'Complete all 10 lessons first.';
      });
    }
  }

  function enhanceWeek() {
    if (enhancing) return;
    const week = weekNumber();
    const lessonView = document.querySelector('#lesson-view');
    if (!week || !lessonView || lessonView.hidden) {
      patchProgress();
      return;
    }

    const lessonContent = lessonView.querySelector('.lesson-content');
    const visual = lessonView.querySelector('#visuals');
    const coreCards = lessonContent ? [...lessonContent.querySelectorAll(':scope > .content-card:not(.supplemental-lesson)')] : [];
    if (!lessonContent || !visual || coreCards.length < 3) return;

    coreCards.forEach((card, index) => {
      const eyebrow = card.querySelector('.eyebrow');
      const label = `Lesson ${index + 1} of ${TOTAL_LESSONS}`;
      if (eyebrow && eyebrow.textContent !== label) eyebrow.textContent = label;
    });
    updateLockedCopy(lessonView, week);

    const existingExtras = lessonContent.querySelectorAll(':scope > .supplemental-lesson');
    if (existingExtras.length === 7) {
      patchProgress();
      return;
    }

    enhancing = true;
    try {
      existingExtras.forEach(node => node.remove());
      const title = lessonView.querySelector('.lesson-title-card h1')?.textContent?.trim() || `Week ${week}`;
      const summary = lessonView.querySelector('.lesson-title-card p')?.textContent?.trim() || '';
      const outcomes = [...lessonView.querySelectorAll('.outcomes-card li')].map(li => li.textContent.trim());
      const extras = extraLessons(title, summary, outcomes);

      extras.forEach((lesson, offset) => visual.before(buildLessonCard(week, lesson, offset + 3)));

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
      patchProgress();
    }
  }

  document.addEventListener('click', (event) => {
    const depthButton = event.target.closest('[data-depth-lesson]');
    if (depthButton) {
      const week = weekNumber();
      if (!week) return;
      const index = Number(depthButton.dataset.depthLesson);
      const key = progressKey(week, 'lesson', index);
      if (isDone(week, index)) localStorage.removeItem(key); else localStorage.setItem(key, 'done');
      depthButton.textContent = isDone(week, index) ? '✓ Lesson complete' : 'Mark lesson complete';
      patchProgress();
      return;
    }

    const scrollButton = event.target.closest('[data-depth-scroll]');
    if (scrollButton) document.getElementById(scrollButton.dataset.depthScroll)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
  window.addEventListener('storage', patchProgress);
  queueMicrotask(enhanceWeek);
})();