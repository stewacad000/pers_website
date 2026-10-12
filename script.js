'use strict';
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const authors = value => escapeHTML(value).replaceAll('Caden Stewart','<strong>Caden Stewart</strong>');
const data = window.portfolio;
if (data) {
  document.querySelector('#publication-list').innerHTML = data.publications.map(([year,status,venue,title,names,url], index) => {
    const detail = data.publicationDetails?.[index] || {};
    const safeUrl = url && /^https:\/\//.test(url);
    const figure = detail.figure ? `<figure class="pub-figure"><a href="${escapeHTML(detail.figure)}" target="_blank" rel="noopener noreferrer" aria-label="Open full-size publication figure"><img src="${escapeHTML(detail.figure)}" alt="${escapeHTML(detail.alt)}" loading="lazy"></a><figcaption>${escapeHTML(detail.caption)} ${detail.license ? `<a href="${escapeHTML(detail.license)}">License ↗</a>` : ''}</figcaption></figure>` : '';
    return `<article class="publication ${figure ? 'has-figure' : ''}" data-status="${escapeHTML(status)}"><div class="pub-meta"><strong>${escapeHTML(year)}</strong><span class="badge">${escapeHTML(status)}</span><div>${escapeHTML(venue)}</div></div><div class="publication-main"><div><h3>${escapeHTML(title)}</h3><p class="authors">${authors(names)}</p>${detail.versionTitle ? `<p class="version-note">${escapeHTML(detail.versionTitle)}</p>` : ''}${detail.summary ? `<p class="pub-summary">${escapeHTML(detail.summary)}</p>` : ''}<div class="pub-links">${safeUrl ? `<a class="pub-link" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${status==='Published' ? 'Read published paper' : 'Read preprint'} ↗</a>` : ''}</div>${index===1 ? '<p class="section-note">Research Square · Version 1 · Not peer reviewed</p>' : ''}${detail.figureNote ? `<p class="figure-unavailable">${escapeHTML(detail.figureNote)}</p>` : ''}</div>${figure}</div></article>`;
  }).join('');
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
