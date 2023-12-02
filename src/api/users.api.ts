import {
    IEmail,
    IAccessToken,
    IAxiosResponseData,
} from "src/types/axios.types";
import {
    IUserData,
    ISigninPayload,
    ISignupPayload,
    IVerifyEmailPayload,
    IChangePasswordPayload,
    IResetPasswordApiPayload,
} from "src/types/auth.types";
import { AxiosResponse } from "axios";
import axiosInstance from "@config/axios.config";

/*
==============================================
API - SIGNUP
==============================================
 */
export const handleSignupApi = async (data: ISignupPayload) => {
    const response = await axiosInstance.post<
        null,
        AxiosResponse<Promise<IAxiosResponseData<null>>>
    >(`/api/v1/auth/signup`, data);
    const message = (await response.data).message;
    return { message };
};

/*
==============================================
API - SIGNIN
==============================================
 */
export const handleSigninApi = async (data: ISigninPayload) => {
    const response = await axiosInstance.post<
        null,
        AxiosResponse<Promise<IAxiosResponseData<IAccessToken>>>
    >(`/api/v1/auth/signin`, data);
    const { accessToken } = (await response.data).data;
    const message = (await response.data).message;
    return {
        accessToken,
        message,
    };
};

/*
==============================================
API - GET CURRENT USER
==============================================
 */
export const handleGetCurrentUserApi = async () => {
    const refreshResponse = await axiosInstance.get<
        null,
        AxiosResponse<Promise<IAxiosResponseData<IAccessToken>>>
    >("/api/v1/auth/refresh");
    const { accessToken } = (await refreshResponse.data).data;
    localStorage.setItem("access_token", accessToken);

    const currentUserResponse = await axiosInstance.get<
        null,
        AxiosResponse<Promise<IAxiosResponseData<IUserData>>>
    >("/api/v1/users/current-user");
    const currentUser = (await currentUserResponse.data).data;
    const message = (await currentUserResponse.data).message;
    return { currentUser, message };
};

/*
==============================================
API - SIGNOUT
==============================================
 */
export const handleSignoutApi = async () => {
    const refreshResponse = await axiosInstance.get<
        null,
        AxiosResponse<Promise<IAxiosResponseData<IAccessToken>>>
    >("/api/v1/auth/refresh");
    const { accessToken } = (await refreshResponse.data).data;
    localStorage.setItem("access_token", accessToken);

    const signoutResponse = await axiosInstance.post<
        null,
        AxiosResponse<Promise<IAxiosResponseData<null>>>
    >("/api/v1/auth/signout");
    const message = (await signoutResponse.data).message;
    return { message };
};

/*
==============================================
API - CHANGE PASSWORD
==============================================
 */
export const handleChangePasswordApi = async (data: IChangePasswordPayload) => {
    const refreshResponse = await axiosInstance.get<
        null,
        AxiosResponse<Promise<IAxiosResponseData<IAccessToken>>>
    >("/api/v1/auth/refresh");
    const { accessToken } = (await refreshResponse.data).data;
    localStorage.setItem("access_token", accessToken);

    const changePasswordApiResponse = await axiosInstance.put<
        null,
        AxiosResponse<Promise<IAxiosResponseData<null>>>
    >("/api/v1/auth/change-password", data);
    const message = (await changePasswordApiResponse.data).message;
    return { message };
};

/*
==============================================
API - VERIFY EMAIL
==============================================
 */
export const handleVerifyEmailApi = async (data: IVerifyEmailPayload) => {
    const verifyEmailApiResponse = await axiosInstance.post<
        null,
        AxiosResponse<Promise<IAxiosResponseData<IEmail>>>
    >("/api/v1/auth/verify-email", data);
    const email = (await verifyEmailApiResponse.data).data.email;
    const message = (await verifyEmailApiResponse.data).message;
    return { email, message };
};

/*
==============================================
API - VERIFY OTP
==============================================
 */
export const handleVerifyOTPApi = async (otp: string) => {
    const verifyOTPResponse = await axiosInstance.post<
        null,
        AxiosResponse<Promise<IAxiosResponseData<null>>>
    >("/api/v1/auth/verify-otp", { otp });
    const message = (await verifyOTPResponse.data).message;
    return { message };
};

/*
==============================================
API - RESET PASSWORD
==============================================
 */
export const handleResetPasswordApi = async (
    data: IResetPasswordApiPayload
) => {
    const resetPasswordResponse = await axiosInstance.put<
        null,
        AxiosResponse<Promise<IAxiosResponseData<null>>>
    >("/api/v1/auth/reset-password", data);
    const message = (await resetPasswordResponse.data).message;
    return { message };
};
