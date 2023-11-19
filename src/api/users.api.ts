import { AxiosResponse } from "axios";
import axiosInstance from "@config/axios.config";
import { ISigninPayload } from "src/types/auth.types";

// handle signup
export const handleSignupApi = async (data: ISigninPayload): Promise<AxiosResponse> => {
    try {
        const response = await axiosInstance.post<Promise<AxiosResponse>>(`/users/signup`, data);
        const resData = await response.data;
        return resData;
    } catch (error) {
        console.log("\n:: Error => users.api => handleSignupApi: ", error);
        throw error;
    }
};
