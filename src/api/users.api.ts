import {
    IUserData,
    ISigninPayload,
    ISignupPayload,
} from "src/types/auth.types";
import axiosInstance from "@config/axios.config";
import { IAccessToken, IAxiosResponseData } from "src/types/axios.types";

// handle signup
export const handleSignupApi = async (
    data: ISignupPayload
): Promise<IAxiosResponseData> => {
    try {
        const response = await axiosInstance.post<Promise<IAxiosResponseData>>(
            `/api/v1/auth/signup`,
            data
        );

        return await response.data;
    } catch (error) {
        throw error as string;
    }
};

// handle signin
export const handleSigninApi = async (
    data: ISigninPayload
): Promise<IAxiosResponseData> => {
    try {
        const response = await axiosInstance.post<Promise<IAxiosResponseData>>(
            `/api/v1/auth/signin`,
            data
        );

        //     "\n:: users.api => handleSigninApi => response.data: ",
        //     response.data
        // );
        return await response.data;
    } catch (error) {
        throw error as string;
    }
};

// handle current user
export const handleGetCurrentUserApi = async (): Promise<IUserData> => {
    try {
        const refreshResponse = await axiosInstance.get<
            Promise<IAxiosResponseData>
        >("/api/v1/auth/refresh");
        const refreshResponseData = (await refreshResponse.data)
            .data as IAccessToken;

        //     "\n:: handleGetCurrentUserApi => token: ",
        //     refreshResponseData.accessToken
        // );
        localStorage.setItem("access_token", refreshResponseData.accessToken);

        const currentUserResponse = await axiosInstance.get<
            Promise<IAxiosResponseData>
        >("/api/v1/users/current-user");
        const currentUserResponseData = (await currentUserResponse.data)
            .data as IUserData;
        return currentUserResponseData;
    } catch (error) {
        //     "\n:: Error => users.api => handleGetCurrentUserApi: ",
        //     error
        // );
        throw error as string;
    }
};

// handle signout
export const handleSignoutApi = async () => {
    try {
        const refreshResponse = await axiosInstance.get<
            Promise<IAxiosResponseData>
        >("/api/v1/auth/refresh");
        const refreshResponseData = (await refreshResponse.data)
            .data as IAccessToken;

        //     "\n:: handleGetCurrentUserApi => token: ",
        //     refreshResponseData.accessToken
        // );
        localStorage.setItem("access_token", refreshResponseData.accessToken);

        const signoutResponse = await axiosInstance.post<
            Promise<IAxiosResponseData>
        >("/api/v1/auth/signout");
        return await signoutResponse.data;
    } catch (error) {
        throw error as string;
    }
};
