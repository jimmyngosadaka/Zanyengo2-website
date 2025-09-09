// Basic UI interactions and simple client-side behaviors.
// Note: This is for demonstration. Replace with real authentication and persistence for production.

document.addEventListener('DOMContentLoaded', () => {
  // Sidebar toggle
  const sidebar = document.getElementById('sidebar');
  const openSidebarBtn = document.getElementById('open-sidebar');
  const closeSidebarBtn = document.getElementById('sidebar-close');
  function openSidebar() { sidebar.classList.add('open'); }
  function closeSidebar() { sidebar.classList.remove('open'); }
  openSidebarBtn.addEventListener('click', openSidebar);
  closeSidebarBtn.addEventListener('click', closeSidebar);
  // Close on outside click (optional)
  document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== openSidebarBtn) {
      closeSidebar();
    }
  });

  // Simple carousel
  const track = document.getElementById('carousel-track');
  const slides = track.querySelectorAll('.carousel-img');
  let idx = 0;
  const total = slides.length;
  function updateCarousel() {
    track.style.transform = `translateX(-${idx * 100}%)`;
  }
  document.getElementById('carousel-prev').addEventListener('click', () => {
    idx = (idx - 1 + total) % total;
    updateCarousel();
  });
  document.getElementById('carousel-next').addEventListener('click', () => {
    idx = (idx + 1) % total;
    updateCarousel();
  });
  // Auto-slide every 5 seconds
  setInterval(() => { idx = (idx + 1) % total; updateCarousel(); }, 5000);

  // Admin signup mock (localStorage)
  const adminForm = document.getElementById('admin-form');
  const adminStatus = document.getElementById('admin-status');
  adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('admin-username').value.trim();
    const password = document.getElementById('admin-password').value;
    if (!username || !password) {
      adminStatus.textContent = 'Please enter username and password.';
      return;
    }
    // Simple mock: store in localStorage (do not use in production)
    const adminData = { username, password };
    localStorage.setItem('zf_admin', JSON.stringify(adminData));
    adminStatus.textContent = `Signed in as ${username} (demo)`;
  });

  // Public comments (persist to localStorage)
  const commentForm = document.getElementById('comment-form');
  const commentList = document.getElementById('comments-list');
  function renderComment(name, text, t) {
    const div = document.createElement('div');
    div.style.borderTop = '1px solid var(--border)';
    div.style.paddingTop = '0.5rem';
    div.innerHTML = `<strong>${name}</strong> <span style="color:var(--muted);font-size:0.9em;margin-left:6px;">${t}</span><div>${text}</div>`;
    commentList.appendChild(div);
  }
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = document.getElementById('comment-text').value.trim();
    if (!text) return;
    const name = 'Guest';
    const time = new Date().toLocaleString();
    renderComment(name, text, time);
    // Persist
    const existing = JSON.parse(localStorage.getItem('zf_comments') || '[]');
    existing.unshift({ name, text, time });
    localStorage.setItem('zf_comments', JSON.stringify(existing));
    document.getElementById('comment-text').value = '';
  });
  // Load existing comments
  (function loadComments() {
    const existing = JSON.parse(localStorage.getItem('zf_comments') || '[]');
    existing.forEach(c => renderComment(c.name, c.text, c.time));
  })();

  // Simple search (demo)
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const samplePages = [
    'Home', 'About', 'Services', 'Team', 'Contact',
    'Education & Training', 'Healthcare', 'Agriculture', 'Empowerment',
  ];
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase();
    if (!q) {
      searchResults.textContent = '';
      return;
    }
    const hits = samplePages.filter(p => p.toLowerCase().includes(q));
    searchResults.innerHTML = hits.length
      ? `<strong>Results:</strong> ${hits.map(h => `<span class="result">${h}</span>`).join(', ')}`
      : 'No results';
  });
});