function escapeHtml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function highlightDart(source) {
  const tokenPattern = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|\b(?:void|const|final|class|return|import|extends|new|if|else|for|while|true|false|null|var|late|async|await)\b|\b(?:String|int|double|bool|Widget|BuildContext|Future|List|Map)\b|\b\d+(?:\.\d+)?\b)/g;
  let output = '';
  let cursor = 0;
  let match;
  while ((match = tokenPattern.exec(source)) !== null) {
    output += escapeHtml(source.slice(cursor, match.index));
    const token = escapeHtml(match[0]);
    let kind = 'token-keyword';
    if (/^\/\//.test(match[0]) || /^\/\*/.test(match[0])) kind = 'token-comment';
    else if (/^[\'\"]/.test(match[0])) kind = 'token-string';
    else if (/^\d/.test(match[0])) kind = 'token-number';
    else if (/^(String|int|double|bool|Widget|BuildContext|Future|List|Map)$/.test(match[0])) kind = 'token-type';
    output += `<span class="${kind}">${token}</span>`;
    cursor = match.index + match[0].length;
  }
  return output + escapeHtml(source.slice(cursor));
}

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('.content-page');
  const main = page?.querySelector('main');
  if (!page || !main) return;

  const title = page.querySelector('h1')?.textContent || 'UNIMUGO CodeLab';
  const headings = [...main.querySelectorAll('h2')];
  headings.forEach((heading, index) => {
    if (!heading.id) heading.id = `bagian-${index + 1}`;
  });

  const top = document.createElement('header');
  top.className = 'module-topbar';
  top.innerHTML = `<a class="module-brand" href="../../../index.html"><span class="brand-mark">UG</span><span>UNIMUGO CodeLab</span></a><span class="module-title">${title}</span><a class="module-catalog" href="../index.html">Daftar modul</a>`;
  document.body.prepend(top);

  const sidebar = document.createElement('aside');
  sidebar.className = 'module-sidebar';
  sidebar.innerHTML = `<button class="sidebar-toggle" type="button" aria-expanded="false">Navigasi materi <span>⌄</span></button><div class="sidebar-content"><div class="sidebar-label">Navigasi materi</div><nav>${headings.map((heading, index) => `<a href="#${heading.id}"><span>${String(index + 1).padStart(2, '0')}</span>${heading.textContent.replace(/^[A-Z]\.\s*/, '')}</a>`).join('')}</nav><div class="tip-panel"><strong>Tips</strong><p>Kerjakan satu bagian sampai memahami outputnya. Jika terjadi error, baca pesan error pertama sebelum mencari solusi.</p></div></div>`;
  page.prepend(sidebar);
  const sidebarToggle = sidebar.querySelector('.sidebar-toggle');
  sidebarToggle.addEventListener('click', () => {
    const expanded = sidebar.classList.toggle('is-open');
    sidebarToggle.setAttribute('aria-expanded', String(expanded));
    sidebarToggle.querySelector('span').textContent = expanded ? '⌃' : '⌄';
  });

  main.querySelectorAll('pre').forEach((block) => {
    block.classList.add('dart-runner');
    const code = block.querySelector('code');
    if (code) code.innerHTML = highlightDart(code.textContent);
    if (!block.querySelector('.code-language')) {
      const label = document.createElement('span');
      label.className = 'code-language';
      label.textContent = 'Dart';
      block.prepend(label);
    }
  });
});
