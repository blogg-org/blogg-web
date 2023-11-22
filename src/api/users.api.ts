import axiosInstance from "@config/axios.config";
import { ISigninPayload, ISignupPayload } from "src/types/auth.types";
import { IAxiosResponseData } from "src/types/axios.types";

// handle signup
export const handleSignupApi = async (
    data: ISignupPayload
): Promise<IAxiosResponseData> => {
    try {
        const response = await axiosInstance.post<Promise<IAxiosResponseData>>(
            `/v1/auth/signup`,
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
            `/v1/auth/signin`,
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
