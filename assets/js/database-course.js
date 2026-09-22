document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('[data-db-module]');
  if (!page) return;

  const key = `codelab-basis-data-${page.dataset.dbModule}`;
  const state = JSON.parse(localStorage.getItem(key) || '{}');
  const checks = [...document.querySelectorAll('[data-progress-check]')];
  const progress = document.querySelector('[data-module-progress]');
  const progressLabel = document.querySelector('[data-progress-label]');

  const updateProgress = () => {
    const total = checks.length;
    const done = checks.filter((item) => item.checked).length;
    const quizDone = document.querySelector('[data-quiz-result].is-passed');
    const score = total ? Math.round((done / total) * 80) + (quizDone ? 20 : 0) : (quizDone ? 100 : 0);
    if (progress) progress.style.width = `${Math.min(score, 100)}%`;
    if (progressLabel) progressLabel.textContent = `${Math.min(score, 100)}% · ${score >= 100 ? 'Selesai' : score ? 'Sedang dipelajari' : 'Belum dimulai'}`;
    localStorage.setItem(key, JSON.stringify({ checks: checks.map((item) => item.checked), score }));
  };
  checks.forEach((item, index) => {
    item.checked = Boolean(state.checks?.[index]);
    item.addEventListener('change', updateProgress);
  });

  document.querySelectorAll('[data-quiz]').forEach((quiz) => {
    const result = quiz.querySelector('[data-quiz-result]');
    quiz.querySelector('[data-check-quiz]')?.addEventListener('click', () => {
      const answers = [...quiz.querySelectorAll('input[type=radio]:checked')];
      const correct = answers.filter((input) => input.dataset.correct === 'true').length;
      const total = quiz.querySelectorAll('[data-question]').length;
      const passed = total > 0 && correct === total;
      result.classList.toggle('is-passed', passed);
      result.textContent = `${correct}/${total} benar. ${passed ? 'Lulus — lanjutkan ke bagian berikutnya.' : 'Belum lulus. Baca kembali penjelasan dan coba lagi.'}`;
      updateProgress();
    });
  });
  updateProgress();

  document.querySelectorAll('[data-erd-check]').forEach((exercise) => {
    const result = exercise.querySelector('[data-erd-feedback]');
    exercise.querySelector('[data-erd-submit]')?.addEventListener('click', () => {
      const entity = exercise.querySelector('[name=entity]')?.value.trim().toLowerCase();
      const key = exercise.querySelector('[name=key]')?.value.trim().toLowerCase();
      const cardinality = exercise.querySelector('[name=cardinality]')?.value;
      const ok = entity === 'mahasiswa' && key === 'nim' && cardinality === 'm:n';
      result.textContent = ok ? 'Benar. Mahasiswa adalah entity, nim adalah identifier, dan hubungan mengambil bersifat M:N.' : 'Periksa lagi: entity yang dicari adalah Mahasiswa, key-nya NIM, dan banyak mahasiswa dapat mengambil banyak mata kuliah (M:N).';
      result.classList.toggle('is-passed', ok);
    });
  });
});