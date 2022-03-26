import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'https://kraken-application.herokuapp.com/api',
  //baseURL: 'http://localhost:8000/api',
  timeout: 20000,  
});

export default axiosInstance;
