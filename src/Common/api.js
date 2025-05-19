import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // 백엔드 주소
    withCredentials: true
});

export default api;
