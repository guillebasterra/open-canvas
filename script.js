
const content = document.getElementById('content');
const links = document.querySelectorAll('nav a');

window.addEventListener('hashchange', renderPage);
renderPage();

function renderPage() {
  const hash = location.hash || '#latest';
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === hash));

  if (hash === '#collaborative') renderCollaborative();
  else renderLatest();
}

function renderLatest() {
  content.innerHTML = `
    <h2>Latest Contributions</h2>
    <div id="latest-container"></div>
  `;

  const container = document.getElementById('latest-container');
  // Placeholder — later will fetch from GitHub API
  for (let i = 0; i < 5; i++) {
    const block = document.createElement('div');
    block.className = 'ascii-square';
    block.innerHTML = `<pre>ASCII #${i+1}</pre><div class="meta">@user — date</div>`;
    container.appendChild(block);
  }
}

function renderCollaborative() {
  content.innerHTML = `
    <h2>Collaborative Paintings</h2>
    <ul>
      <li><a href="#painting1">Painting 1</a></li>
      <li><a href="#painting2">Painting 2</a></li>
      <li><a href="#painting3">Painting 3</a></li>
    </ul>
  `;
}

