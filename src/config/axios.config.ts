import { envConfig } from "./env.config";
import { IAxiosError } from "src/types/axios.types";
import axios, {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: envConfig.backendBaseURI,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// Add request interceptor to handle token or authentication headers
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // customise request config here
        // add authentication headers
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error: AxiosError): Promise<AxiosError> => Promise.reject(error)
);

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log("\n:: response interceptor => response: ", response);
        return response;
    },
    (error: AxiosError<IAxiosError>): Promise<string> => {
        console.log("\n:: Error: ", error);
        if (error.response) {
            if (
                error.response.status === 401 ||
                error.response.status === 403
            ) {
                localStorage.setItem("isLoggedIn", "false");
            }
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
