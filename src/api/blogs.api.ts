import {
    IPostFromDB,
    IPostFormData,
    IUpdatePostArgs,
} from "src/types/blogs.types";
import { AxiosResponse } from "axios";
import axiosInstance from "@config/axios.config";
import { IAccessToken, IAxiosResponseData } from "src/types/axios.types";

/*
==============================================
API - GET ALL POSTS
==============================================
 */
export const handleGetAllPostsApi = async () => {
    try {
        const refreshResponse = await axiosInstance.get<
            Promise<IAxiosResponseData>
        >("/api/v1/auth/refresh");
        const refreshResponseData = (await refreshResponse.data)
            .data as IAccessToken;
        localStorage.setItem("access_token", refreshResponseData.accessToken);

        const response =
            await axiosInstance.get<AxiosResponse<Promise<IPostFromDB[]>>>(
                "/api/v1/blogs"
            );
        const allPosts = await response.data.data;
        return allPosts;
    } catch (error) {
        throw error as string;
    }
};

/*
==============================================
API - CREATE A NEW POST
==============================================
 */
export const handleCreateNewPostApi = async (data: IPostFormData) => {
    try {
        const refreshResponse = await axiosInstance.get<
            AxiosResponse<Promise<IAccessToken>>
        >("/api/v1/auth/refresh");
        const refreshResponseData = await refreshResponse.data.data;
        localStorage.setItem("access_token", refreshResponseData.accessToken);

        const response = await axiosInstance.post<
            AxiosResponse<Promise<IPostFromDB>>
        >(
            "/api/v1/blogs/add",
            { ...data, featuredImage: data.featuredImage[0] },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        const post = await response.data.data;
        return post;
    } catch (error) {
        throw error as string;
    }
};

/*
==============================================
API - UPDATE POST
==============================================
 */
export const handleUpdatePostApi = async ({
    oldPost,
    data,
}: IUpdatePostArgs) => {
    try {
        // console.log()
        const refreshResponse = await axiosInstance.get<
            AxiosResponse<Promise<IAccessToken>>
        >("/api/v1/auth/refresh");
        const refreshResponseData = await refreshResponse.data.data;
        localStorage.setItem("access_token", refreshResponseData.accessToken);

        const response = await axiosInstance.put<
            AxiosResponse<Promise<IPostFromDB>>
        >(
            `/api/v1/blogs/edit/${oldPost._id}`,
            { ...data, featuredImage: data.featuredImage[0] },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        const post = await response.data.data;
        return post;
    } catch (error) {
        throw error as string;
    }
};

/*
==============================================
API - DELETE POST
==============================================
 */
export const handleDeletePostApi = async (blogId: string) => {
    try {
        const refreshResponse = await axiosInstance.get<
            AxiosResponse<Promise<IAccessToken>>
        >("/api/v1/auth/refresh");
        const refreshResponseData = await refreshResponse.data.data;
        localStorage.setItem("access_token", refreshResponseData.accessToken);

        const response = await axiosInstance.delete<
            AxiosResponse<Promise<IPostFromDB>>
        >(`/api/v1/blogs/remove/${blogId}`);
        return await response.data.data;
    } catch (error) {
        throw error as string;
    }
};
