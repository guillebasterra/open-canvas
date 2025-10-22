const content = document.getElementById("content");
const links = document.querySelectorAll("nav a");

// --- Replace these with your repo details ---
const owner = "guillebasterra";
const repo = "open-canvas";
// --------------------------------------------

window.addEventListener("hashchange", renderPage);
renderPage();

function renderPage() {
  const hash = location.hash || "#latest";
  links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === hash));

  if (hash === "#collaborative") {
    renderCollaborative();
  } else {
    renderLatest();
  }
}

async function renderLatest() {
  content.innerHTML = "";
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/ascii`);
    const files = await response.json();

    // sort by last modified date (newest first)
    const sorted = files.sort((a, b) => new Date(b.git_url) - new Date(a.git_url));

    for (const file of sorted.slice(0, 9)) {
      const text = await fetch(file.download_url).then(r => r.text());
      const block = document.createElement("div");
      block.className = "ascii-block";
      block.innerHTML = `<pre>${escapeHTML(text)}</pre>`;
      content.appendChild(block);
    }
  } catch (err) {
    console.error(err);
    content.innerHTML = "<p style='padding:1rem'>Error loading ASCII files.</p>";
  }
}

function renderCollaborative() {
  content.innerHTML = `
    <div style="padding:2rem;">
      <h2>Collaborative Paintings</h2>
      <ul>
        <li><a href="#painting1">Painting 1</a></li>
        <li><a href="#painting2">Painting 2</a></li>
        <li><a href="#painting3">Painting 3</a></li>
      </ul>
    </div>
  `;
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[c]));
}
