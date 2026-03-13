// === Page Navigation ===
function switchPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  document.getElementById('page-' + pageId).classList.add('active');
  const navItem = document.querySelector(`.nav-item[data-page="${pageId}"]`);
  if (navItem) navItem.classList.add('active');

  // Reset scroll
  document.querySelector('.main-content').scrollTop = 0;
}

// === Intent Input ===
function setIntent(text) {
  document.getElementById('intentInput').value = text;
  document.getElementById('intentInput').focus();
}

function submitIntent() {
  const input = document.getElementById('intentInput');
  const text = input.value.trim();
  if (!text) return;

  // Hide home content, show processing
  document.getElementById('statsRow').style.display = 'none';
  document.getElementById('recentHeader').style.display = 'none';
  document.getElementById('recentGrid').style.display = 'none';

  const processing = document.getElementById('processingSection');
  processing.style.display = 'block';
  document.getElementById('processIntentText').textContent = text;

  // Reset all steps
  const steps = ['step-intent', 'step-agent', 'step-script', 'step-shot', 'step-generate', 'step-edit'];
  steps.forEach(id => {
    const el = document.getElementById(id);
    el.classList.remove('active', 'done');
    el.querySelector('.step-status').textContent = '等待中';
    el.querySelector('.step-status').className = 'step-status pending';
  });

  document.getElementById('routerPanel').style.display = 'none';
  document.getElementById('resultSection').style.display = 'none';

  // Reset connectors
  document.querySelectorAll('.pipeline-connector').forEach(c => c.classList.remove('done'));

  // Animate pipeline
  runPipeline(steps);
}

function runPipeline(steps) {
  const connectors = document.querySelectorAll('.pipeline-connector');
  let i = 0;

  function nextStep() {
    if (i >= steps.length) {
      // All done, show result
      setTimeout(() => {
        document.getElementById('resultSection').style.display = 'block';
        document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 400);
      return;
    }

    const el = document.getElementById(steps[i]);
    el.classList.add('active');
    el.querySelector('.step-status').textContent = '执行中...';
    el.querySelector('.step-status').className = 'step-status running';

    // Show router panel when we hit generate step
    if (steps[i] === 'step-generate') {
      document.getElementById('routerPanel').style.display = 'block';
    }

    const duration = 800 + Math.random() * 1200;

    setTimeout(() => {
      el.classList.remove('active');
      el.classList.add('done');
      el.querySelector('.step-status').textContent = '完成';
      el.querySelector('.step-status').className = 'step-status done';

      // Mark connector as done
      if (connectors[i]) connectors[i].classList.add('done');

      i++;
      setTimeout(nextStep, 200);
    }, duration);
  }

  nextStep();
}

// === Workflow Tab Switch ===
function switchWfTab(btn, tabId) {
  document.querySelectorAll('.wf-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.wf-content').forEach(c => c.classList.remove('active'));

  btn.classList.add('active');
  document.getElementById('wf-' + tabId).classList.add('active');
}

// === Agent Detail (placeholder) ===
function openAgentDetail(agentId) {
  console.log('Open agent:', agentId);
}

// === Discover Page: Category Filter ===
function filterCategory(btn, category) {
  document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  const cards = document.querySelectorAll('.feed-card');
  cards.forEach(card => {
    if (category === 'all') {
      card.classList.remove('hidden');
    } else {
      const cats = card.getAttribute('data-category') || '';
      if (cats.includes(category)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    }
  });
}

// === Discover Page: Search Filter ===
function filterFeedCards() {
  const query = document.getElementById('discoverSearch').value.trim().toLowerCase();
  const cards = document.querySelectorAll('.feed-card');
  cards.forEach(card => {
    if (!query) {
      card.classList.remove('hidden');
      return;
    }
    const text = card.textContent.toLowerCase();
    if (text.includes(query)) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

// === Discover Page: Quick Create from top bar ===
function discoverStartCreate() {
  const input = document.getElementById('discoverIntentInput');
  const text = input.value.trim();
  if (!text) return;

  // Switch to home/create page and fill in the intent
  switchPage('home');
  document.getElementById('intentInput').value = text;
  input.value = '';
  submitIntent();
}
