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

  // Skill toggles
  document.querySelectorAll('.ae-skill-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      if (toggle.classList.contains('on')) {
        toggle.classList.remove('on');
        toggle.classList.add('off');
        toggle.textContent = 'OFF';
      } else {
        toggle.classList.remove('off');
        toggle.classList.add('on');
        toggle.textContent = 'ON';
      }
    });
  });

  // Icon picker
  document.querySelectorAll('.ae-icon-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.ae-icon-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
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

// === Agent Editor: Template Selection ===
function selectAgentTemplate(type) {
  document.querySelectorAll('.ae-template').forEach(t => t.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
  document.getElementById('agentConfig').style.display = 'block';
  setTimeout(() => {
    document.getElementById('agentConfig').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);

  const templates = {
    food: { name: '美食探店 Agent', desc: '探店视频, 菜品展示, 餐厅氛围宣传. 支持日系/中式/西式多种风格.' },
    product: { name: '商品广告 Agent', desc: '电商开箱, 卖点展示, 产品对比视频. 支持竖屏/横屏多尺寸.' },
    travel: { name: '旅行Vlog Agent', desc: '目的地攻略, 旅行日记, 风景展示. 自动匹配轻音乐.' },
    brand: { name: '品牌宣传 Agent', desc: '企业宣传片, 品牌故事, 年度回顾. 大气简约风格.' },
    education: { name: '教育内容 Agent', desc: '知识讲解, 课程片段, 教学动画. 支持数字人讲解.' },
    pet: { name: '萌宠内容 Agent', desc: '宠物日常, 萌宠大片, 宠物Vlog. 自动追踪宠物画面.' },
    fitness: { name: '健身内容 Agent', desc: '健身教程, 运动打卡, 身材对比. 自动添加数据标注.' },
    blank: { name: '自定义 Agent', desc: '' },
  };
  const tpl = templates[type] || templates.blank;
  const nameInput = document.getElementById('agentName');
  if (nameInput) nameInput.value = tpl.name;
}
