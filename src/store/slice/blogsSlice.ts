import {
    handleCreateNewPostApi,
    handleDeletePostApi,
    handleGetAllPostsApi,
    handleUpdatePostApi,
} from "@api/blogs.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { rootState } from "@store/store";
import {
    IPostFormData,
    IPostFromDB,
    IUpdatePostArgs,
} from "src/types/blogs.types";

interface IInitialState {
    status: "idle" | "loading" | "succeeded" | "failed";
    data: IPostFromDB[];
    message: string;
    error: string;
}

const initialState: IInitialState = {
    status: "idle",
    data: [],
    message: "",
    error: "",
};

// get all posts
export const allPosts = createAsyncThunk("posts/all-posts", async () => {
    const response = await handleGetAllPostsApi();
    return response;
});

// create a new post
export const createNewPost = createAsyncThunk(
    "posts/create",
    async (data: IPostFormData) => {
        const response = await handleCreateNewPostApi(data);
        return response;
    }
);

// update post
export const updatePost = createAsyncThunk(
    "posts/update",
    async ({ oldPost, data }: IUpdatePostArgs) => {
        const response = await handleUpdatePostApi({ oldPost, data });
        return response;
    }
);

// delete post
export const deletePost = createAsyncThunk(
    "posts/delete",
    async (blogId: string) => {
        const response = await handleDeletePostApi(blogId);
        return response;
    }
);

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        resetPosts: (state) => {
            state.data = [];
            state.status = "idle";
            state.error = "";
        },
    },
    extraReducers: (builder) => {
        builder
            // get all posts
            .addCase(allPosts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(allPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload.posts;
                state.message = action.payload.message;
                state.error = "";
            })
            .addCase(allPosts.rejected, (state, action) => {
                state.status = "failed";
                state.data = [];
                state.error = action.error.message!;
            })

            // create new post
            .addCase(createNewPost.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createNewPost.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = [...state.data, action.payload.post];
                state.message = action.payload.message;
                state.error = "";
            })
            .addCase(createNewPost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message!;
            })

            // update post
            .addCase(updatePost.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = "";
                state.message = action.payload.message;
                const postFromDB = action.payload.post;
                const posts = state.data.filter(
                    (post) => post._id !== postFromDB._id
                );
                state.data = [...posts, postFromDB];
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message!;
            })

            // delete post
            .addCase(deletePost.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.status = "succeeded";
                const postFromDB = action.payload.post;
                const posts = state.data.filter(
                    (post) => post._id !== postFromDB._id
                );
                state.data = [...posts];
                state.message = action.payload.message;
                state.error = "";
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message!;
            });
    },
});

export const getPostsStatus = (state: typeof rootState) => state.posts.status;
export const getPostsMessage = (state: typeof rootState) => state.posts.message;
export const getPostsError = (state: typeof rootState) => state.posts.error;
export const getAllPosts = (state: typeof rootState) => state.posts.data;
export const getPostFromSlug = (state: typeof rootState, slug: string) =>
    state.posts.data?.find((post) => slug === post.slug);

export const { resetPosts } = postsSlice.actions;
export default postsSlice.reducer;
