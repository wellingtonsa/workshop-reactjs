import axios from 'axios';

const api = axios.create({
   baseURL: 'http://10.5.6.222:3000' 
})

export default api;