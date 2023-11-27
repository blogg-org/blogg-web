export interface IPostFromDB {
    _id: string;
    title: string;
    slug: string;
    content: string;
    featuredImage: string;
    status: "active" | "inactive";
    author: string;
}

export interface IInitialStatePostsSlice {
    status: "idle" | "loading" | "succeeded" | "failed";
    data: IPostFromDB[];
    error: string;
}
