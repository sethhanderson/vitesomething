import axios, { AxiosResponse } from 'axios';

// Create base axios instance with common configuration
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors (token expired, etc.)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication endpoints
export const authAPI = {
  login: (email: string, password: string): Promise<AxiosResponse> => 
    api.post('/auth/login', { email, password }),
    
  register: (name: string, email: string, password: string): Promise<AxiosResponse> =>
    api.post('/auth/register', { name, email, password }),
    
  getCurrentUser: (): Promise<AxiosResponse> =>
    api.get('/auth/me'),
    
  logout: (): Promise<AxiosResponse> =>
    api.post('/auth/logout'),
};

// Content endpoints
export const contentAPI = {
  getAllContent: (params?: any): Promise<AxiosResponse> =>
    api.get('/content', { params }),
    
  getContentById: (id: string): Promise<AxiosResponse> =>
    api.get(`/content/${id}`),
    
  createContent: (contentData: any): Promise<AxiosResponse> =>
    api.post('/content', contentData),
    
  updateContent: (id: string, contentData: any): Promise<AxiosResponse> =>
    api.put(`/content/${id}`, contentData),
    
  deleteContent: (id: string): Promise<AxiosResponse> =>
    api.delete(`/content/${id}`),

  scheduleContent: (id: string, scheduleData: any): Promise<AxiosResponse> =>
    api.post(`/content/${id}/schedule`, scheduleData),
  
  getContentAnalytics: (id: string): Promise<AxiosResponse> =>
    api.get(`/content/${id}/analytics`),
};

// Schedule endpoints
export const scheduleAPI = {
  getSchedule: (params?: any): Promise<AxiosResponse> =>
    api.get('/schedule', { params }),
    
  getScheduleByDate: (startDate: string, endDate: string): Promise<AxiosResponse> =>
    api.get(`/schedule/date-range`, { params: { startDate, endDate } }),
    
  rescheduleContent: (scheduleId: string, newDate: string): Promise<AxiosResponse> =>
    api.put(`/schedule/${scheduleId}`, { scheduledFor: newDate }),
    
  cancelSchedule: (scheduleId: string): Promise<AxiosResponse> =>
    api.delete(`/schedule/${scheduleId}`),
};

// Platform endpoints
export const platformAPI = {
  getAllPlatforms: (): Promise<AxiosResponse> =>
    api.get('/platforms'),
    
  connectPlatform: (platformName: string, credentials: any): Promise<AxiosResponse> =>
    api.post(`/platforms/${platformName}/connect`, credentials),
    
  disconnectPlatform: (platformId: string): Promise<AxiosResponse> =>
    api.delete(`/platforms/${platformId}`),
};

// Analytics endpoints
export const analyticsAPI = {
  getOverallAnalytics: (dateRange?: { startDate: string; endDate: string }): Promise<AxiosResponse> =>
    api.get('/analytics/overall', { params: dateRange }),
    
  getPlatformAnalytics: (platformId: string, dateRange?: { startDate: string; endDate: string }): Promise<AxiosResponse> =>
    api.get(`/analytics/platform/${platformId}`, { params: dateRange }),
    
  getContentTypeAnalytics: (dateRange?: { startDate: string; endDate: string }): Promise<AxiosResponse> =>
    api.get('/analytics/content-types', { params: dateRange }),
};

export default api;