// === Page Navigation ===
function switchPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + pageId).classList.add('active');
  const navItem = document.querySelector(`.nav-item[data-page="${pageId}"]`);
  if (navItem) navItem.classList.add('active');
  document.querySelector('.main-content').scrollTop = 0;
}

// === Canvas Node Click (show properties panel) ===
document.addEventListener('DOMContentLoaded', () => {
  const nodes = document.querySelectorAll('.canvas-node');
  const propsContent = document.getElementById('propsContent');
  const propsPlaceholder = document.querySelector('.props-placeholder');

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      nodes.forEach(n => n.style.borderColor = '');
      node.style.borderColor = 'var(--accent)';
      node.style.boxShadow = '0 0 16px rgba(245,158,11,0.2)';

      if (propsContent && propsPlaceholder) {
        propsPlaceholder.style.display = 'none';
        propsContent.style.display = 'block';
      }
    });
  });

  // Range slider display
  const range = document.querySelector('.prop-range');
  const rangeVal = document.querySelector('.range-value');
  if (range && rangeVal) {
    range.addEventListener('input', () => {
      rangeVal.textContent = (range.value / 100).toFixed(1);
    });
  }
});
