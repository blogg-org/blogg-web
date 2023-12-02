import axios, {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import { envConfig } from "./env.config";
import { IAxiosError } from "src/types/axios.types";

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
        return response;
    },
    (error: AxiosError<IAxiosError>): Promise<string> => {
        if (error.response) {
            if (
                error.response.status === 401 ||
                error.response.status === 403
            ) {
                localStorage.setItem("isSignedIn", "false");
            }
            error.message = error.response.data.message;
        }
        if (!error.message) {
            error.message = "Something went wrong.";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
