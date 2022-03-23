import axiosInstance from './instance';

export function createInterceptors() {
  axiosInstance.interceptors.request.use((config) => {
    
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error);
    },
  );
}
