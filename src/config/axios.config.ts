import { envConfig } from "./env.config";
import { IAxiosError, IAxiosResponseData } from "src/types/axiosResponse.types";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: envConfig.backendBaseURI,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
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
        // }s
        console.log(config);
        return config;
    },
    (error: AxiosError): Promise<AxiosError> => Promise.reject(error)
);

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
    (response: AxiosResponse<IAxiosResponseData, AxiosRequestConfig>) => {
        console.log("\n:: response interceptor => response: ", response);
        return response;
    },
    (error: AxiosError<IAxiosError>): Promise<string> => {
        console.log("\n:: Error: ", error);
        if (error.response) {
            console.error("\n:: HTTP Error: ", error.response.status, error.response.data);
            error.message = error.response.data.message;
        } else if (error.request) {
            // Handle network-related errors (e.g., no internet connection)
            console.error("\n:: Network Error:", error.message);
        } else {
            // Handle other errors
            console.error("\n:: Error:", error.message);
        }
        return Promise.reject(error.message);
    }
);

export default axiosInstance;
