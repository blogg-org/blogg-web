import { handleGetAllPostsApi } from "@api/blogs.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { rootState } from "@store/store";
import { IInitialStatePostsSlice } from "src/types/blogs.types";

const initialState: IInitialStatePostsSlice = {
    status: "idle",
    data: [],
    error: "",
};

// get all posts
export const allPosts = createAsyncThunk("posts/all-posts", async () => {
    try {
        const response = await handleGetAllPostsApi();
        return response;
    } catch (error) {
        console.log("\n:: Error => postsSlice => getAllPosts: ", error);
        throw error;
    }
});

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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
            });
    },
});

export const getAllPosts = (state: typeof rootState) => state.posts.data;

export default postsSlice.reducer;
