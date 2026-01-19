import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },
  
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  }
};

// Photo APIs
export const photoAPI = {
  uploadPhoto: async (photoURL, caption = '') => {
    const response = await api.post('/photos', { photoURL, caption });
    return response.data;
  },
  
  getAllPhotos: async () => {
    const response = await api.get('/photos');
    return response.data;
  },
  
  updateCaption: async (photoId, caption) => {
    const response = await api.put(`/photos/${photoId}`, { caption });
    return response.data;
  },
  
  deletePhoto: async (photoId) => {
    const response = await api.delete(`/photos/${photoId}`);
    return response.data;
  },
  
  searchPhotos: async (query) => {
    const response = await api.get(`/photos/search?q=${query}`);
    return response.data;
  }
};

export default api;