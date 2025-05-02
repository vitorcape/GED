import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ged-production.up.railway.app', // troque pela URL do Railway
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;