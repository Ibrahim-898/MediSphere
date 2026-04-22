// filepath: src/services/api.js
const API_BASE_URL = 'http://localhost:8000/api';

const api = {
  // Auth endpoints
  auth: {
    register: async (userData) => {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      return response.json();
    },
    
    login: async (credentials) => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      return response.json();
    },
    
    getProfile: async (token) => {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.json();
    },
  },

  // Profile endpoints
  profile: {
    create: async (token, profileData) => {
      const response = await fetch(`${API_BASE_URL}/profiles/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });
      return response.json();
    },
    
    get: async (token) => {
      const response = await fetch(`${API_BASE_URL}/profiles`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.json();
    },
  },

  // Lab Reports endpoints
  lab: {
    getReports: async (token) => {
      const response = await fetch(`${API_BASE_URL}/lab/reports`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.json();
    },
    
    createReport: async (token, reportData) => {
      const response = await fetch(`${API_BASE_URL}/lab/reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reportData),
      });
      return response.json();
    },
    
    updateReport: async (token, reportId, reportData) => {
      const response = await fetch(`${API_BASE_URL}/lab/reports/${reportId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reportData),
      });
      return response.json();
    },
  },

  // Prescriptions endpoints
  prescriptions: {
    getAll: async (token) => {
      const response = await fetch(`${API_BASE_URL}/prescriptions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.json();
    },
    
    create: async (token, prescriptionData) => {
      const response = await fetch(`${API_BASE_URL}/prescriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(prescriptionData),
      });
      return response.json();
    },
  },

  // Appointments endpoints
  appointments: {
    getAll: async (token) => {
      const response = await fetch(`${API_BASE_URL}/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.json();
    },
    
    create: async (token, appointmentData) => {
      const response = await fetch(`${API_BASE_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentData),
      });
      return response.json();
    },
  },
};

export default api;