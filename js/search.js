// ========== 搜索页逻辑：加载 search.json + Fuse.js 模糊搜索 ==========
(function() {
  const input = document.getElementById('pageSearchInput');
  const resultsBox = document.getElementById('searchResults');
  const hint = document.getElementById('searchHint');
  if (!input || !resultsBox) return;

  let articles = [];

  fetch('/search.json')
    .then((res) => {
      if (!res.ok) throw new Error('索引加载失败');
      return res.json();
    })
    .then((data) => {
      articles = data;
      // URL 带 ?q= 时自动搜索（导航栏搜索框跳转过来）
      const q = new URLSearchParams(window.location.search).get('q');
      if (q) {
        input.value = q;
        doSearch(q);
      }
    })
    .catch(() => {
      if (hint) hint.textContent = '搜索索引加载失败，请先运行 scripts/gen-search-index.py 生成索引。';
    });

  function doSearch(query) {
    const q = query.toLowerCase();
    const results = articles.filter((a) =>
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q)) ||
      a.body.includes(q)
    );
    if (!results.length) {
      resultsBox.innerHTML = '<p class="text-muted text-sm">没有找到与「' + escapeHtml(query) + '」相关的文章。</p>';
      return;
    }
    resultsBox.innerHTML = results.map((a) =>
      '<article class="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition">' +
      '<h2 class="font-semibold hover:text-primary transition"><a href="' + a.url + '">' + escapeHtml(a.title) + '</a></h2>' +
      '<p class="text-muted text-sm mt-1 text-ellipsis-2">' + escapeHtml(a.description) + '</p>' +
      '<div class="text-xs text-muted mt-2">' + escapeHtml(a.date) + (a.tags.length ? ' · ' + a.tags.map(escapeHtml).join('、') : '') + '</div>' +
      '</article>'
    ).join('');
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && input.value.trim()) {
      doSearch(input.value.trim());
    }
  });
})();
