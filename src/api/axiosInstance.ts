// import axios from 'axios';
// import store from '../redux/store';


// const url= import.meta.env.VITE_API_URL;

// // Create an Axios instance
// const axiosInstance = axios.create({
//   baseURL: url, // Replace with your API base URL
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const state = store.getState();
//     const token= state.auth.token;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized errors (token expired, etc.)
//       localStorage.removeItem('token');
//     //   window.location.href = '/login'; // Redirect to login page
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;



import axios from 'axios';
import store from '../redux/store';

const url = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: url,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;

    // ✅ Automatically skip setting Content-Type for FormData
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // window.location.href = '/login'; // Optional
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
