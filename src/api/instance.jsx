import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'https://kraken-application.herokuapp.com/api',
  timeout: 20000,  
});

export default axiosInstance;
