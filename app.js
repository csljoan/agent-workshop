// ===== 我的待辦清單 =====
// 純前端實作，不使用任何框架或套件；資料儲存在瀏覽器的 localStorage。

const STORAGE_KEY = 'offline-todo-list';
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const remainingCount = document.getElementById('remaining-count');
const clearCompletedButton = document.getElementById('clear-completed');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeLabel = document.getElementById('theme-label');
const filterButtons = document.querySelectorAll('.filter-button');

let todos = loadTodos();
const THEME_STORAGE_KEY = 'offline-todo-theme';
const FILTER_STORAGE_KEY = 'offline-todo-filter';
let currentFilter = loadFilter();

// 從 localStorage 讀取資料；資料格式異常時回傳空清單。
function loadTodos() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

// 將目前的待辦清單寫回 localStorage。
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 從 localStorage 讀取篩選條件；無效值安全回退為全部。
function loadFilter() {
  const savedFilter = localStorage.getItem(FILTER_STORAGE_KEY);
  const validFilters = ['all', 'active', 'completed'];
  return validFilters.includes(savedFilter) ? savedFilter : 'all';
}

// 套用篩選條件並同步按鈕的選中狀態。
function applyFilter(filter) {
  currentFilter = filter;
  filterButtons.forEach((filterButton) => {
    const isSelected = filterButton.dataset.filter === currentFilter;
    filterButton.classList.toggle('active', isSelected);
    filterButton.setAttribute('aria-pressed', String(isSelected));
  });
}

// 取得使用者的主題偏好；尚未手動設定時跟隨作業系統。
function getInitialTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// 套用主題並同步切換按鈕的文字與圖示。
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const isDark = theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeIcon.textContent = isDark ? '☀️' : '🌙';
  themeLabel.textContent = isDark ? '淺色模式' : '深色模式';
}

// 依照目前篩選條件取得要顯示的待辦事項。
function getVisibleTodos() {
  if (currentFilter === 'active') return todos.filter((todo) => !todo.completed);
  if (currentFilter === 'completed') return todos.filter((todo) => todo.completed);
  return todos;
}

// 依照目前狀態重新繪製畫面。
function render() {
  list.replaceChildren();
  const visibleTodos = getVisibleTodos();

  visibleTodos.forEach((todo) => {
    const item = document.createElement('li');
    item.className = todo.completed ? 'todo-item completed' : 'todo-item';
    item.dataset.id = todo.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.setAttribute('aria-label', `標記「${todo.text}」為完成`);

    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.text;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'btn-delete';
    deleteButton.textContent = '刪除';
    deleteButton.setAttribute('aria-label', `刪除「${todo.text}」`);

    item.append(checkbox, text, deleteButton);
    list.append(item);
  });

  emptyState.hidden = visibleTodos.length > 0;
  if (todos.length === 0) {
    emptyState.textContent = '還沒有任何待辦事項,新增一個吧!';
  } else if (currentFilter === 'active') {
    emptyState.textContent = '目前沒有未完成的待辦事項。';
  } else if (currentFilter === 'completed') {
    emptyState.textContent = '目前沒有已完成的待辦事項，項目只是被篩選掉了，並沒有被刪除。';
  }

  const remaining = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  remainingCount.textContent = `未完成:${remaining} 項`;
  clearCompletedButton.disabled = completedCount === 0;
}

// 產生待辦事項使用的唯一識別碼。
function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (!text) return;

  todos.push({ id: createId(), text, completed: false });
  saveTodos();
  render();
  input.value = '';
  input.focus();
});

list.addEventListener('click', (event) => {
  const item = event.target.closest('.todo-item');
  if (!item) return;

  const id = item.dataset.id;

  if (event.target.matches('input[type="checkbox"]')) {
    todos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  } else if (event.target.matches('.btn-delete')) {
    todos = todos.filter((todo) => todo.id !== id);
  } else {
    return;
  }

  saveTodos();
  render();
});

clearCompletedButton.addEventListener('click', () => {
  if (!todos.some((todo) => todo.completed)) return;
  if (!window.confirm('確定要清除所有已完成的待辦事項嗎？')) return;

  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  render();
});

themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  applyTheme(nextTheme);
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    localStorage.setItem(FILTER_STORAGE_KEY, button.dataset.filter);
    applyFilter(button.dataset.filter);
    render();
  });
});

applyTheme(getInitialTheme());
applyFilter(currentFilter);
render();