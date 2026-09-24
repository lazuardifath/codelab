(() => {
  const checks = [...document.querySelectorAll('[data-mobile-check]')];
  const key = 'pemrograman-mobile-modul-03';
  const saved = JSON.parse(localStorage.getItem(key) || '{}');
  checks.forEach((item, index) => {
    item.checked = !!saved[index];
    item.addEventListener('change', () => {
      const state = {};
      checks.forEach((check, i) => { state[i] = check.checked; });
      localStorage.setItem(key, JSON.stringify(state));
      updateProgress();
    });
  });
  document.querySelectorAll('.copy-mobile-code').forEach((button) => button.addEventListener('click', () => {
    navigator.clipboard?.writeText(button.parentElement.querySelector('code').textContent);
    button.textContent = 'Tersalin';
    setTimeout(() => { button.textContent = 'Salin'; }, 1200);
  }));
  document.querySelector('.sidebar-toggle')?.addEventListener('click', () => document.querySelector('.module-sidebar').classList.toggle('is-open'));
  document.querySelector('[data-mobile-quiz]')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const answers = ['stack', 'stack', 'loading', 'provider', 'provider'];
    const form = new FormData(event.target);
    const score = answers.reduce((total, answer, index) => total + (form.get(`mobile-q${index}`) === answer ? 1 : 0), 0);
    const result = document.querySelector('[data-mobile-result]');
    result.textContent = `${score}/5 benar. ${score >= 4 ? 'Lulus. Lanjutkan ke tugas.' : 'Belum lulus. Baca kembali konsep dan coba lagi.'}`;
  });
  function escapeHtml(value) {
    return value.replace(/[&<>\"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', "'": '&#39;' })[character]);
  }
  function highlightDart() {
    const keywords = new Set(['class', 'const', 'final', 'void', 'return', 'if', 'else', 'switch', 'case', 'new', 'extends', 'sealed', 'import', 'runApp', 'override', 'true', 'false']);
    document.querySelectorAll('.mobile-code pre code').forEach((code) => {
      const source = code.textContent;
      const pattern = /(\/\/[^\\n]*|&quot;[^&]*?&quot;|&#39;[^&]*?&#39;|\\b\\d+(?:\\.\\d+)?\\b|\\b[A-Z][A-Za-z0-9_]*\\b|\\b[A-Za-z_][A-Za-z0-9_]*\\b)/g;
      code.innerHTML = escapeHtml(source).replace(pattern, (token) => {
        if (token.startsWith('//')) return `<span class="token-comment">${token}</span>`;
        if (token.startsWith('&quot;') || token.startsWith('&#39;')) return `<span class="token-string">${token}</span>`;
        if (/^\\d/.test(token)) return `<span class="token-number">${token}</span>`;
        if (/^[A-Z]/.test(token)) return `<span class="token-type">${token}</span>`;
        if (keywords.has(token)) return `<span class="token-keyword">${token}</span>`;
        return token;
      });
      const block = code.closest('.mobile-code');
      if (block && !block.querySelector('.code-language')) {
        const label = document.createElement('span');
        label.className = 'code-language';
        label.textContent = 'Dart';
        block.append(label);
      }
    });
  }
  function updateProgress() {
    const done = checks.filter((item) => item.checked).length;
    const percent = checks.length ? Math.round(done / checks.length * 100) : 0;
    document.querySelector('[data-progress-bar]').style.width = `${percent}%`;
    document.querySelector('[data-progress-label]').textContent = `${percent}% · ${percent === 100 ? 'Selesai' : percent ? 'Sedang dipelajari' : 'Belum dimulai'}`;
  }
  highlightDart();
  updateProgress();
})();
