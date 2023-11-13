import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { envConfig } from "./env.config";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: envConfig.backendBaseURI,
    timeout: 5000,
    headers: {
        "Content-Type": "applications/json",
    },
});

// Add request interceptor to handle token or authentication headers
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // customise request config here
        // add authentication headers
        // const token = getToken();
        // if (token) {
        //   config.headers['Authorization'] = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (error) => {
        if (error.response) {
            console.error("\n:: HTTP Error: ", error.response.status, error.response.data);
        } else if (error.request) {
            // Handle network-related errors (e.g., no internet connection)
            console.error("\n:: Network Error:", error.message);
        } else {
            // Handle other errors
            console.error("\n:: Error:", error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
