const content = document.getElementById("content");
const links = document.querySelectorAll("nav a");

// --- Replace these with your repo info ---
const owner = "guillebasterra";
const repo = "open-canvas";
// ------------------------------------------

window.addEventListener("hashchange", renderPage);
renderPage();

function renderPage() {
  const hash = location.hash || "#latest";
  links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === hash));
  if (hash === "#collaborative") renderCollaborative();
  else renderLatest();
}

async function renderLatest() {
  content.innerHTML = "";
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/ascii`);
    const files = await response.json();

    // Iterate through files and fetch commit metadata
    const items = [];
    for (const file of files) {
      const commitsUrl = `https://api.github.com/repos/${owner}/${repo}/commits?path=${file.path}&per_page=1`;
      const [commit] = await fetch(commitsUrl).then(r => r.json());
      if (!commit) continue;

      const art = await fetch(file.download_url).then(r => r.text());
      items.push({
        art,
        title: commit.commit.message || "Untitled",
        author: commit.author?.login || "anonymous",
        date: new Date(commit.commit.author.date)
      });
    }

    // Sort newest first
    items.sort((a, b) => b.date - a.date);

    for (const item of items.slice(0, 9)) {
      const block = document.createElement("div");
      block.className = "ascii-block";
      block.innerHTML = `
        <pre>${escapeHTML(item.art)}</pre>
        <div class="meta">
          ${escapeHTML(item.title)}<br>
          by @${escapeHTML(item.author)} — ${item.date.toUTCString()}
        </div>
      `;
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
