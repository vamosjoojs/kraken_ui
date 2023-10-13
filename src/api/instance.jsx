import axios from 'axios';

export function getToken(){
  const token = localStorage.getItem('token');
  return { 'Authorization': 'Bearer ' + token }
}

const axiosInstance = axios.create({
  baseURL: 'http://kraken.meshdebts.org/api',
  //baseURL: 'http://localhost:8000/api',
  timeout: 20000,  
  headers: getToken()
});

export default axiosInstance;
