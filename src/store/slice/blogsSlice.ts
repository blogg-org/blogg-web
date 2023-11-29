import {
    handleCreateNewPostApi,
    handleDeletePostApi,
    handleGetAllPostsApi,
    handleUpdatePostApi,
} from "@api/blogs.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { rootState } from "@store/store";
import {
    IInitialStatePostsSlice,
    IPostFormData,
    IUpdatePostArgs,
} from "src/types/blogs.types";

const initialState: IInitialStatePostsSlice = {
    status: "idle",
    data: [],
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
    async (data: IPostFormData, { rejectWithValue }) => {
        try {
            const response = await handleCreateNewPostApi(data);
            return response;
        } catch (error) {
            return rejectWithValue(error ?? "Error occured while publishing");
        }
    }
);

// update post
export const updatePost = createAsyncThunk(
    "posts/update",
    async ({ oldPost, data }: IUpdatePostArgs, { rejectWithValue }) => {
        try {
            const response = await handleUpdatePostApi({ oldPost, data });
            return response;
        } catch (error) {
            return rejectWithValue(error ?? "Error occured while updating");
        }
    }
);

// delete post
export const deletePost = createAsyncThunk(
    "posts/delete",
    async (blogId: string, { rejectWithValue }) => {
        try {
            const response = await handleDeletePostApi(blogId);
            return response;
        } catch (error) {
            return rejectWithValue(error ?? "Error occured while deleting");
        }
    }
);

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // get all posts
            .addCase(allPosts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(allPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
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
                state.data = [...state.data, action.payload];
                state.error = "";
            })
            .addCase(createNewPost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })

            // update post
            .addCase(updatePost.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = "";

                const posts = state.data.filter(
                    (post) => post._id !== action.payload._id
                );
                state.data = [...posts, action.payload];
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })

            // delete post
            .addCase(deletePost.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.status = "succeeded";

                const posts = state.data.filter(
                    (post) => post._id !== action.payload._id
                );
                state.data = [...posts];
                state.error = "";
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    },
});

export const getPostsStatus = (state: typeof rootState) => state.posts.status;
export const getAllPosts = (state: typeof rootState) => state.posts.data;
export const getPostFromSlug = (state: typeof rootState, slug: string) =>
    state.posts.data?.find((post) => slug === post.slug);

export default postsSlice.reducer;
