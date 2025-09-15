// ====== CONFIG (list page only) ======
const state = { perPage: 9, currentPage: 1, filter: 'all' };

// ====== ELEMENTS ======
const postsGrid    = document.querySelector('.posts-grid');
const paginationEl = document.getElementById('pagination');
const filtersEl    = document.querySelector('.filters');

// Helpers
const allCards = () => Array.from(postsGrid.querySelectorAll('.post-card'));

function getFilteredCards() {
  return allCards().filter(c => state.filter === 'all' || c.dataset.category === state.filter);
}

function renderPagination(totalPages) {
  paginationEl.style.display = totalPages <= 1 ? 'none' : 'flex';
  if (totalPages <= 1) { paginationEl.innerHTML = ''; return; }

  const cur = state.currentPage, last = totalPages;
  const parts = [];
  parts.push(`<button class="page-btn prev ${cur===1?'is-disabled':''}" data-page="${cur-1}" ${cur===1?'disabled':''}>‹ Previous</button>`);

  const pageBtn = (p) => `<button class="page-btn ${p===cur?'is-active':''}" data-page="${p}" ${p===cur?'aria-current="page"':''}>${p}</button>`;
  const show = new Set([1, 2, cur-1, cur, cur+1, last-1, last]);
  let prev = 0;
  for (let p = 1; p <= last; p++) {
    if (show.has(p)) {
      if (prev && p - prev > 1) parts.push('<span class="page-ellipsis">…</span>');
      parts.push(pageBtn(p));
      prev = p;
    }
  }
  parts.push(`<button class="page-btn next ${cur===last?'is-disabled':''}" data-page="${cur+1}" ${cur===last?'disabled':''}>Next ›</button>`);
  paginationEl.innerHTML = parts.join('');
}

function applyFilterAndPagination() {
  const filtered = getFilteredCards();
  const totalPages = Math.max(1, Math.ceil(filtered.length / state.perPage));
  state.currentPage = Math.min(state.currentPage, totalPages);

  allCards().forEach(c => (c.style.display = 'none'));
  const start = (state.currentPage - 1) * state.perPage;
  const end   = start + state.perPage;
  filtered.forEach((card, idx) => { if (idx >= start && idx < end) card.style.display = ''; });

  renderPagination(totalPages);
}

// Events
filtersEl?.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn'); if (!btn) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b === btn));
  state.filter = btn.dataset.filter; state.currentPage = 1; applyFilterAndPagination();
});
paginationEl?.addEventListener('click', (e) => {
  const btn = e.target.closest('.page-btn'); if (!btn || btn.classList.contains('is-disabled')) return;
  const next = parseInt(btn.dataset.page, 10); if (!Number.isFinite(next)) return;
  state.currentPage = Math.max(1, next); applyFilterAndPagination();
});

// Initial paint
applyFilterAndPagination();
