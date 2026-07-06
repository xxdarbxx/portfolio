function renderProjectGroups(containerSelector, groups) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  container.innerHTML = groups.map((group, gi) => `
    <div class="project-group reveal" data-lightbox-group>
      <div class="project-group__head">
        <h3>${group.title}</h3>
        ${group.link ? `<a href="${group.link}" target="_blank" rel="noopener">visit site <i class="fas fa-arrow-up-right-from-square"></i></a>` : `<span class="project-group__count">${group.images.length} screenshot${group.images.length > 1 ? 's' : ''}</span>`}
      </div>
      <div class="thumb-grid">
        ${group.images.map((img, i) => `
          <div class="thumb" data-lightbox data-full="${img.src}" data-caption="${(img.caption || group.title).replace(/"/g, '&quot;')}">
            <img src="${img.src}" alt="${(img.caption || group.title).replace(/"/g, '&quot;')}" loading="lazy" decoding="async">
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.reveal').forEach(el => {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { threshold: 0.08 });
      io.observe(el);
    } else {
      el.classList.add('in');
    }
  });
}

function renderCertCategories(containerSelector, categories) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  let total = 0;
  categories.forEach(c => total += c.items.length);

  container.innerHTML = categories.map(cat => `
    <div class="cert-category reveal" data-lightbox-group data-cert-cat="${cat.slug}">
      <div class="cert-category__head">
        <h3>${cat.name}</h3>
        <span>${cat.items.length} certificate${cat.items.length > 1 ? 's' : ''}</span>
      </div>
      <div class="cert-grid">
        ${cat.items.map(item => item.pdf ? `
          <div class="cert-thumb pdf" data-lightbox-skip>
            <a href="${item.src}" target="_blank" rel="noopener" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.5rem;height:100%;width:100%;">
              <i class="fas fa-file-pdf"></i>
              <span>${item.label || 'View PDF certificate'}</span>
            </a>
          </div>
        ` : `
          <div class="cert-thumb" data-lightbox data-full="${item.src}" data-caption="${(item.label || cat.name).replace(/"/g, '&quot;')}">
            <img src="${item.src}" alt="${(item.label || cat.name).replace(/"/g, '&quot;')}" loading="lazy" decoding="async">
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  const countEl = document.querySelector('[data-cert-total]');
  if (countEl) countEl.textContent = total;

  container.querySelectorAll('.reveal').forEach(el => {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { threshold: 0.05 });
      io.observe(el);
    } else {
      el.classList.add('in');
    }
  });

  // cert tab filtering
  const tabs = document.querySelectorAll('.cert-tab');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const slug = tab.dataset.slug;
    container.querySelectorAll('.cert-category').forEach(catEl => {
      catEl.style.display = (slug === 'all' || catEl.dataset.certCat === slug) ? '' : 'none';
    });
  }));
}
