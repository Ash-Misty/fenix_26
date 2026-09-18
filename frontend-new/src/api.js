const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

function getHeaders() {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function api(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: getHeaders(),
    ...options,
  });

  if (res.status === 401) {
    localStorage.removeItem('adminToken');
    window.location.hash = '#/admin/login';
    throw new Error('Session expired. Please login again.');
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const details = Array.isArray(data.errors) && data.errors.length ? data.errors.join(' ') : data.message;
    throw new Error(details || `Request failed: ${res.status}`);
  }
  return data;
}

export async function apiUpload(path, formData) {
  const token = localStorage.getItem('adminToken');
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  // Do NOT set Content-Type - browser sets multipart boundary

  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers,
    body: formData,
  });

  if (res.status === 401) {
    localStorage.removeItem('adminToken');
    window.location.hash = '#/admin/login';
    throw new Error('Session expired. Please login again.');
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `Request failed: ${res.status}`);
  }
  return data;
}

export default api;
