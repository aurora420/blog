// ====== CONFIG ======
const state = {
    perPage: 9,          // 3 columns x 3 rows on desktop; adjust as you like
    currentPage: 1,
    filter: 'all'
  };
  
  // ====== ELEMENTS ======
  const postsGrid = document.querySelector('.posts-grid');
  const paginationEl = document.getElementById('pagination');
  const filtersEl = document.querySelector('.filters');  // your category chips
  
  // Convenience
  const allCards = () => Array.from(postsGrid.querySelectorAll('.post-card'));
  
  // ====== RENDER HELPERS ======
  function getFilteredCards() {
    return allCards().filter(c =>
      state.filter === 'all' || c.dataset.category === state.filter
    );
  }
  
  function renderPagination(totalPages) {
    // Hide pagination if only 1 page
    paginationEl.style.display = totalPages <= 1 ? 'none' : 'flex';
    if (totalPages <= 1) { paginationEl.innerHTML = ''; return; }
  
    const cur = state.currentPage;
    const parts = [];
  
    // Prev
    parts.push(
      `<button class="page-btn prev ${cur===1?'is-disabled':''}" data-page="${cur-1}" ${cur===1?'disabled':''}>‹ Previous</button>`
    );
  
    // Helper to push a page number
    const pageBtn = (p) =>
      `<button class="page-btn ${p===cur?'is-active':''}" data-page="${p}" ${p===cur?'aria-current="page"':''}>${p}</button>`;
  
    // Pages with ellipses: 1 ... (cur-1) cur (cur+1) ... last
    const last = totalPages;
    const show = new Set([1, last, cur-1, cur, cur+1, 2, last-1]); // keeps neighbors tidy
  
    let prevShown = 0;
    for (let p = 1; p <= last; p++) {
      if (show.has(p)) {
        if (prevShown && p - prevShown > 1) parts.push('<span class="page-ellipsis">…</span>');
        parts.push(pageBtn(p));
        prevShown = p;
      }
    }
  
    // Next
    parts.push(
      `<button class="page-btn next ${cur===last?'is-disabled':''}" data-page="${cur+1}" ${cur===last?'disabled':''}>Next ›</button>`
    );
  
    paginationEl.innerHTML = parts.join('');
  }
  
  function applyFilterAndPagination() {
    const filtered = getFilteredCards();
    const totalPages = Math.max(1, Math.ceil(filtered.length / state.perPage));
    state.currentPage = Math.min(state.currentPage, totalPages);
  
    // Hide all first
    allCards().forEach(c => (c.style.display = 'none'));
  
    // Show only the slice for the current page
    const start = (state.currentPage - 1) * state.perPage;
    const end = start + state.perPage;
    filtered.forEach((card, idx) => {
      if (idx >= start && idx < end) card.style.display = '';
    });
  
    renderPagination(totalPages);
  }
  
  // ====== EVENTS ======
  
  // Category filters (event delegation)
  if (filtersEl) {
    filtersEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
  
      document.querySelectorAll('.filter-btn').forEach(b =>
        b.classList.toggle('active', b === btn)
      );
  
      state.filter = btn.dataset.filter; // 'all' | 'biomedical' | 'technology' | 'art'
      state.currentPage = 1;
      applyFilterAndPagination();
    });
  }
  
  // Pagination clicks (event delegation)
  paginationEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.page-btn');
    if (!btn || btn.classList.contains('is-disabled')) return;
    const nextPage = parseInt(btn.dataset.page, 10);
    if (!Number.isFinite(nextPage)) return;
    state.currentPage = Math.max(1, nextPage);
    applyFilterAndPagination();
  });
  
  // Initial paint
  applyFilterAndPagination();
  