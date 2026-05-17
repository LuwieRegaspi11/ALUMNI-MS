import { projectId, publicAnonKey } from '/utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-fb96ca04`;

// Helper function to make API requests
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${publicAnonKey}`,
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }

    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

// ========================================
// ALUMNI API
// ========================================

export const alumniApi = {
  getAll: () => apiRequest('/alumni'),

  getById: (id: string) => apiRequest(`/alumni/${id}`),

  create: (alumniData: any) => apiRequest('/alumni', {
    method: 'POST',
    body: JSON.stringify(alumniData),
  }),

  update: (id: string, alumniData: any) => apiRequest(`/alumni/${id}`, {
    method: 'PUT',
    body: JSON.stringify(alumniData),
  }),

  delete: (id: string) => apiRequest(`/alumni/${id}`, {
    method: 'DELETE',
  }),

  batchVerify: (id: string, representativeData: any) => apiRequest(`/alumni/${id}/batch-verify`, {
    method: 'POST',
    body: JSON.stringify(representativeData),
  }),
};

// ========================================
// BATCH REPRESENTATIVES API
// ========================================

export const representativesApi = {
  getAll: () => apiRequest('/representatives'),

  assign: (repData: any) => apiRequest('/representatives', {
    method: 'POST',
    body: JSON.stringify(repData),
  }),
};

// ========================================
// DONATIONS API
// ========================================

export const donationsApi = {
  getAll: () => apiRequest('/donations'),

  create: (donationData: any) => apiRequest('/donations', {
    method: 'POST',
    body: JSON.stringify(donationData),
  }),

  verify: (id: string, verifierData: any) => apiRequest(`/donations/${id}/verify`, {
    method: 'POST',
    body: JSON.stringify(verifierData),
  }),
};

// ========================================
// EVENTS API
// ========================================

export const eventsApi = {
  getAll: () => apiRequest('/events'),

  create: (eventData: any) => apiRequest('/events', {
    method: 'POST',
    body: JSON.stringify(eventData),
  }),
};

// ========================================
// ANALYTICS API
// ========================================

export const analyticsApi = {
  getPopulation: () => apiRequest('/analytics/population'),
};

// ========================================
// AUDIT LOGS API
// ========================================

export const auditLogsApi = {
  getAll: () => apiRequest('/audit-logs'),
};
