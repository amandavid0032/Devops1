const $ = (selector) => document.querySelector(selector);
const PUBLIC_VIEWS = ['login', 'register'];
let currentUser = null;

// ---------- helpers ----------

async function api(url, options = {}) {
  const init = { credentials: 'same-origin', ...options };
  if (init.body && !(init.body instanceof FormData)) {
    init.headers = { 'Content-Type': 'application/json' };
    init.body = JSON.stringify(init.body);
  }
  const response = await fetch(url, init);
  const data = await response.json().catch(() => ({}));
  if (response.status === 401 && !url.startsWith('/api/auth/')) {
    currentUser = null;
    location.hash = '#/login';
  }
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`);
  return data;
}

let toastTimer;
function toast(message, type = 'ok') {
  const element = $('#toast');
  element.textContent = message;
  element.className = `show ${type}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { element.className = ''; }, 3000);
}

function formatSize(bytes) {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(index ? 1 : 0)} ${units[index]}`;
}

function formatDate(value) {
  return value ? new Date(value).toLocaleString() : '—';
}

function cell(text, className) {
  const td = document.createElement('td');
  td.textContent = text;
  if (className) td.className = className;
  return td;
}

function button(label, className, onClick) {
  const element = document.createElement('button');
  element.type = 'button';
  element.textContent = label;
  element.className = `small ${className}`;
  element.addEventListener('click', onClick);
  return element;
}

// Disables the submit button while a form request runs and shows errors as a toast.
function handleForm(form, handler) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submit = form.querySelector('button[type="submit"]');
    submit.disabled = true;
    try {
      await handler(new FormData(form));
    } catch (error) {
      toast(error.message, 'error');
    } finally {
      submit.disabled = false;
    }
  });
}

// ---------- routing ----------

function setUser(user) {
  currentUser = user;
  $('#topbar-name').textContent = user ? user.name : '';
  $('#admin-link').hidden = user?.role !== 'admin';
}

async function render() {
  let view = (location.hash.replace('#/', '') || 'dashboard').split('?')[0];

  if (!currentUser && !PUBLIC_VIEWS.includes(view)) view = 'login';
  if (currentUser && PUBLIC_VIEWS.includes(view)) view = 'dashboard';
  if (view === 'admin' && currentUser?.role !== 'admin') view = 'dashboard';
  if (!document.querySelector(`[data-view="${view}"]`)) view = 'dashboard';
  if (location.hash !== `#/${view}`) history.replaceState(null, '', `#/${view}`);

  document.querySelectorAll('[data-view]').forEach((section) => { section.hidden = section.dataset.view !== view; });
  document.querySelectorAll('[data-nav]').forEach((link) => link.classList.toggle('active', link.dataset.nav === view));
  $('#topbar').hidden = !currentUser;

  try {
    if (view === 'dashboard') await loadDashboard();
    if (view === 'files') await loadFiles();
    if (view === 'profile') loadProfile();
    if (view === 'admin') await loadAdmin();
  } catch (error) {
    toast(error.message, 'error');
  }
}

// ---------- views ----------

async function loadDashboard() {
  const stats = await api('/api/files/stats');
  $('#dash-name').textContent = currentUser.name;
  $('#stat-count').textContent = stats.count;
  $('#stat-size').textContent = formatSize(stats.totalSize);
  $('#stat-last').textContent = formatDate(stats.lastUpload);
  $('#stat-role').textContent = currentUser.role;

  const details = $('#account-details');
  details.replaceChildren();
  const rows = [
    ['Name', currentUser.name],
    ['Email', currentUser.email],
    ['Phone', currentUser.phone || '—'],
    ['Bio', currentUser.bio || '—'],
    ['User ID', currentUser.id],
    ['Joined', formatDate(currentUser.createdAt)],
    ['Last login', formatDate(currentUser.lastLoginAt)],
  ];
  for (const [label, value] of rows) {
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    dt.textContent = label;
    dd.textContent = value;
    details.append(dt, dd);
  }
}

async function loadFiles() {
  const { files } = await api('/api/files');
  const body = $('#files-body');
  body.replaceChildren();
  $('#files-empty').hidden = files.length > 0;

  for (const file of files) {
    const row = document.createElement('tr');
    const actions = document.createElement('div');
    actions.className = 'actions';

    const download = document.createElement('a');
    download.href = `/api/files/${file.id}/download`;
    download.textContent = 'Download';
    download.className = 'small';

    actions.append(download, button('Delete', 'danger', async () => {
      if (!confirm(`Delete "${file.originalName}"?`)) return;
      try {
        await api(`/api/files/${file.id}`, { method: 'DELETE' });
        toast('File deleted.');
        loadFiles();
      } catch (error) {
        toast(error.message, 'error');
      }
    }));

    const actionCell = document.createElement('td');
    actionCell.append(actions);
    row.append(
      cell(file.originalName, 'name'),
      cell(file.mimeType || '—'),
      cell(formatSize(file.size)),
      cell(formatDate(file.createdAt)),
      actionCell,
    );
    body.append(row);
  }
}

function loadProfile() {
  const form = $('#profile-form');
  form.name.value = currentUser.name;
  form.email.value = currentUser.email;
  form.phone.value = currentUser.phone || '';
  form.bio.value = currentUser.bio || '';
}

async function loadAdmin() {
  const { users } = await api('/api/admin/users');
  const body = $('#users-body');
  body.replaceChildren();

  for (const user of users) {
    const row = document.createElement('tr');
    const roleCell = document.createElement('td');
    const badge = document.createElement('span');
    badge.className = `badge ${user.role}`;
    badge.textContent = user.role;
    roleCell.append(badge);

    const actionCell = document.createElement('td');
    if (user.id !== currentUser.id) {
      const actions = document.createElement('div');
      actions.className = 'actions';
      const newRole = user.role === 'admin' ? 'user' : 'admin';
      actions.append(
        button(`Make ${newRole}`, 'secondary', async () => {
          try {
            await api(`/api/admin/users/${user.id}/role`, { method: 'PATCH', body: { role: newRole } });
            toast(`${user.name} is now ${newRole}.`);
            loadAdmin();
          } catch (error) {
            toast(error.message, 'error');
          }
        }),
        button('Delete', 'danger', async () => {
          if (!confirm(`Delete ${user.email} and all their files?`)) return;
          try {
            await api(`/api/admin/users/${user.id}`, { method: 'DELETE' });
            toast('User deleted.');
            loadAdmin();
          } catch (error) {
            toast(error.message, 'error');
          }
        }),
      );
      actionCell.append(actions);
    }

    row.append(
      cell(user.name, 'name'),
      cell(user.email),
      roleCell,
      cell(user.fileCount),
      cell(formatSize(user.totalSize)),
      cell(formatDate(user.createdAt)),
      cell(formatDate(user.lastLoginAt)),
      actionCell,
    );
    body.append(row);
  }
}

// ---------- forms ----------

handleForm($('#login-form'), async (data) => {
  const { user } = await api('/api/auth/login', { method: 'POST', body: Object.fromEntries(data) });
  setUser(user);
  $('#login-form').reset();
  toast(`Welcome back, ${user.name}!`);
  location.hash = '#/dashboard';
});

handleForm($('#register-form'), async (data) => {
  const { user } = await api('/api/auth/register', { method: 'POST', body: Object.fromEntries(data) });
  setUser(user);
  $('#register-form').reset();
  toast('Account created.');
  location.hash = '#/dashboard';
});

handleForm($('#upload-form'), async (data) => {
  await api('/api/files', { method: 'POST', body: data });
  $('#upload-form').reset();
  toast('File uploaded.');
  loadFiles();
});

handleForm($('#profile-form'), async (data) => {
  const { user } = await api('/api/users/me', { method: 'PUT', body: Object.fromEntries(data) });
  setUser(user);
  toast('Profile updated.');
});

handleForm($('#password-form'), async (data) => {
  const result = await api('/api/users/me/password', { method: 'PUT', body: Object.fromEntries(data) });
  $('#password-form').reset();
  toast(result.message);
});

handleForm($('#delete-form'), async (data) => {
  if (!confirm('Really delete your account and all files? This cannot be undone.')) return;
  await api('/api/users/me', { method: 'DELETE', body: Object.fromEntries(data) });
  setUser(null);
  toast('Account deleted.');
  location.hash = '#/login';
});

async function logout(url) {
  try {
    await api(url, { method: 'POST' });
  } finally {
    setUser(null);
    location.hash = '#/login';
    render();
    toast('Logged out.');
  }
}

$('#logout-btn').addEventListener('click', () => logout('/api/auth/logout'));
$('#logout-all-btn').addEventListener('click', () => logout('/api/auth/logout-all'));

// ---------- start ----------

window.addEventListener('hashchange', render);

(async () => {
  try {
    const { user } = await api('/api/auth/me');
    setUser(user);
  } catch {
    setUser(null);
  }
  render();
})();
