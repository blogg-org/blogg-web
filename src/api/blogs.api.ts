import axiosInstance from "@config/axios.config";
import { AxiosResponse } from "axios";
import { IAccessToken, IAxiosResponseData } from "src/types/axios.types";
import { IPostFromDB } from "src/types/blogs.types";

export const handleGetAllPostsApi = async () => {
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

        const response =
            await axiosInstance.get<AxiosResponse<Promise<IPostFromDB[]>>>(
                "/api/v1/blogs"
            );
        const allPosts = await response.data.data;
        console.log(
            "\n:: users.api => handleSigninApi => allPosts: ",
            allPosts
        );
        return allPosts;
    } catch (error) {
        console.log("\n:: Error => users.api => handleSigninApi: ", error);
        throw error as string;
    }
};
