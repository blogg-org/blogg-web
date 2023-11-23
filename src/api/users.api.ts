import axiosInstance from "@config/axios.config";
import {
    ISigninPayload,
    ISignupPayload,
    IUserData,
} from "src/types/auth.types";
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
        console.log("\n:: users.api => response: ", response);
        return await response.data;
    } catch (error) {
        console.log("\n:: Error => users.api => handleSignupApi: ", error);
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
        console.log(
            "\n:: users.api => handleSigninApi => response.data: ",
            response.data
        );
        return await response.data;
    } catch (error) {
        console.log("\n:: Error => users.api => handleSigninApi: ", error);
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
        console.log(
            "\n:: handleGetCurrentUserApi => token: ",
            refreshResponseData.accessToken
        );
        localStorage.setItem("access_token", refreshResponseData.accessToken);

        const currentUserResponse = await axiosInstance.get<
            Promise<IAxiosResponseData>
        >("/api/v1/users/current-user");
        const currentUserResponseData = (await currentUserResponse.data)
            .data as IUserData;
        return currentUserResponseData;
    } catch (error) {
        console.log(
            "\n:: Error => users.api => handleGetCurrentUserApi: ",
            error
        );
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
        console.log(
            "\n:: handleGetCurrentUserApi => token: ",
            refreshResponseData.accessToken
        );
        localStorage.setItem("access_token", refreshResponseData.accessToken);

        const signoutResponse = await axiosInstance.post<
            Promise<IAxiosResponseData>
        >("/api/v1/auth/signout");
        return await signoutResponse.data;
    } catch (error) {
        console.log("\n:: Error => users.api => handleSignout: ", error);
        throw error as string;
    }
};
