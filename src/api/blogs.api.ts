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
    const refreshResponse = await axiosInstance.get<
        null,
        AxiosResponse<Promise<IAxiosResponseData<IAccessToken>>>
    >("/api/v1/auth/refresh");
    const { accessToken } = (await refreshResponse.data).data;
    localStorage.setItem("access_token", accessToken);

    const response = await axiosInstance.get<
        null,
        AxiosResponse<Promise<IAxiosResponseData<IPostFromDB[]>>>
    >("/api/v1/blogs");
    const posts = (await response.data).data;
    const message = (await response.data).message;
    return { posts, message };
};

/*
==============================================
API - CREATE A NEW POST
==============================================
 */
export const handleCreateNewPostApi = async (data: IPostFormData) => {
    const refreshResponse = await axiosInstance.get<
        null,
        AxiosResponse<Promise<IAxiosResponseData<IAccessToken>>>
    >("/api/v1/auth/refresh");
    const { accessToken } = (await refreshResponse.data).data;
    localStorage.setItem("access_token", accessToken);

    const response = await axiosInstance.post<
        null,
        AxiosResponse<Promise<IAxiosResponseData<IPostFromDB>>>
    >(
        "/api/v1/blogs/add",
        { ...data, featuredImage: data.featuredImage[0] },
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    const post = (await response.data).data;
    const message = (await response.data).message;
    return { post, message };
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
    const refreshResponse = await axiosInstance.get<
        null,
        AxiosResponse<Promise<IAxiosResponseData<IAccessToken>>>
    >("/api/v1/auth/refresh");
    const { accessToken } = (await refreshResponse.data).data;
    localStorage.setItem("access_token", accessToken);

    const response = await axiosInstance.put<
        null,
        AxiosResponse<Promise<IAxiosResponseData<IPostFromDB>>>
    >(
        `/api/v1/blogs/edit/${oldPost._id}`,
        { ...data, featuredImage: data.featuredImage[0] },
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    const post = (await response.data).data;
    const message = (await response.data).message;
    return { post, message };
};

/*
==============================================
API - DELETE POST
==============================================
 */
export const handleDeletePostApi = async (blogId: string) => {
    const refreshResponse = await axiosInstance.get<
        null,
        AxiosResponse<Promise<IAxiosResponseData<IAccessToken>>>
    >("/api/v1/auth/refresh");
    const { accessToken } = (await refreshResponse.data).data;
    localStorage.setItem("access_token", accessToken);

    const response = await axiosInstance.delete<
        null,
        AxiosResponse<Promise<IAxiosResponseData<IPostFromDB>>>
    >(`/api/v1/blogs/remove/${blogId}`);
    const post = (await response.data).data;
    const message = (await response.data).message;
    return { post, message };
};
