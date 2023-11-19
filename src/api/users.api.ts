import axiosInstance from "@config/axios.config";
import { ISigninPayload } from "src/types/auth.types";
import { IAxiosResponseData } from "src/types/axiosResponse.types";

// handle signup
export const handleSignupApi = async (data: ISigninPayload): Promise<IAxiosResponseData> => {
    try {
        const response = await axiosInstance.post<Promise<IAxiosResponseData>>(`/users/signup`, data);
        console.log("\n:: users.api => response: ", response);
        return await response.data;
    } catch (error) {
        console.log("\n:: Error => users.api => handleSignupApi: ", error);
        throw error as string;
    }
};
