// API helper to interact with Node.js Express & MongoDB backend
const API_BASE = '/api';

export async function fetchJson(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(err.error || `HTTP ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
}

// Services
export const getServices = () => fetchJson('/services');
export const createService = (data) => fetchJson('/services', { method: 'POST', body: JSON.stringify(data) });
export const updateService = (id, data) => fetchJson(`/services/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteService = (id) => fetchJson(`/services/${id}`, { method: 'DELETE' });

// Orders
export const getOrders = (email = '') => fetchJson(`/orders${email ? `?email=${encodeURIComponent(email)}` : ''}`);
export const createOrder = (data) => fetchJson('/orders', { method: 'POST', body: JSON.stringify(data) });
export const updateOrder = (id, data) => fetchJson(`/orders/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteOrder = (id) => fetchJson(`/orders/${id}`, { method: 'DELETE' });

// Messages (Contact)
export const getMessages = () => fetchJson('/messages');
export const createMessage = (data) => fetchJson('/messages', { method: 'POST', body: JSON.stringify(data) });
export const deleteMessage = (id) => fetchJson(`/messages/${id}`, { method: 'DELETE' });

// Articles
export const getArticles = () => fetchJson('/articles');
export const createArticle = (data) => fetchJson('/articles', { method: 'POST', body: JSON.stringify(data) });
export const updateArticle = (id, data) => fetchJson(`/articles/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteArticle = (id) => fetchJson(`/articles/${id}`, { method: 'DELETE' });

// Settings
export const getSettings = () => fetchJson('/settings');
export const updateSettings = (data) => fetchJson('/settings', { method: 'PUT', body: JSON.stringify(data) });

// Dashboard Stats
export const getStats = () => fetchJson('/stats');

