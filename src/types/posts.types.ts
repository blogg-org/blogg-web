import { StateStatus } from "./auth.types";

export type PostsStateStatus = StateStatus;

export interface IPostFromDB {
    _id: string;
    title: string;
    slug: string;
    content: string;
    featuredImage: {
        _id: string;
        publicId?: string;
        url: string;
    };
    status: "active" | "inactive";
    author: string;
}

export interface IPostFormData {
    title: string;
    slug: string;
    content: string;
    featuredImage: FileList;
    status: "active" | "inactive";
}

export interface IUpdatePostArgs {
    oldPost: IPostFromDB;
    data: IPostFormData;
}
