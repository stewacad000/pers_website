'use strict';
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const authors = value => escapeHTML(value).replaceAll('Caden Stewart','<strong>Caden Stewart</strong>');
const data = window.portfolio;
if (data) {
  document.querySelector('#publication-list').innerHTML = data.publications.map(([year,status,venue,title,names,url]) => `<article class="publication" data-status="${escapeHTML(status)}"><div class="pub-meta"><strong>${escapeHTML(year)}</strong><span class="badge">${escapeHTML(status)}</span><div>${escapeHTML(venue)}</div></div><div><h3>${escapeHTML(title)}</h3><p class="authors">${authors(names)}</p>${url && /^https:\/\//.test(url) ? `<a class="pub-link" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">Read preprint ↗</a><p class="section-note">Research Square · May 2025 · Version 1</p>` : ''}</div></article>`).join('');
  for (const [key,id] of [['presentations','presentation-list'],['posters','poster-list']]) {
    document.getElementById(id).innerHTML = data[key].map(([year,venue,title,names]) => `<article class="talk"><p class="eyebrow">${escapeHTML(year)} / ${escapeHTML(venue)}</p><h3>${escapeHTML(title)}</h3><p class="authors">${authors(names)}</p></article>`).join('');
  }
  document.querySelector('#award-list').innerHTML = data.awards.map(([year,title,note]) => `<div class="award"><span>${escapeHTML(year)}</span><p>${escapeHTML(title)}${note?`<br><small>${escapeHTML(note)}</small>`:''}</p></div>`).join('');
  document.querySelector('#service-list').innerHTML = data.service.map(([year,title,description]) => `<article class="talk"><p class="eyebrow">${escapeHTML(year)}</p><h3>${escapeHTML(title)}</h3><p>${escapeHTML(description)}</p></article>`).join('');
  document.querySelector('.filters').hidden = false;
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(other => { const active=other===button;other.classList.toggle('selected',active);other.setAttribute('aria-pressed',String(active)); });
    document.querySelectorAll('.publication').forEach(article => { article.hidden = !(button.dataset.filter === 'all' || (button.dataset.filter === 'progress' ? article.dataset.status !== 'Published' : article.dataset.status === button.dataset.filter)); });
  }));
}
document.querySelector('#year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      document.querySelectorAll('nav a').forEach(a => {if(a.hash===`#${entry.target.id}`) a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
    }
  }, {rootMargin:'-20% 0px -60% 0px'});
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}
