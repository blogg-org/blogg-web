import { rootState } from "@store/store";
import {
    handleGetCurrentUserApi,
    handleSigninApi,
    handleSignoutApi,
    handleSignupApi,
} from "@api/users.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    ISigninPayload,
    ISignupPayload,
    IUserData,
} from "src/types/auth.types";
import { IAccessToken } from "src/types/axios.types";

export interface ISignupResponse {
    message: string;
}

interface IInitialState {
    status: "idle" | "loading" | "succeeded" | "failed";
    data: IUserData;
    isLoggedIn: string;
    message: string;
    error: string;
}

const initialState: IInitialState = {
    status: "idle",
    data: {} as IUserData,
    isLoggedIn: localStorage.getItem("isLoggedIn") ?? "false",
    message: "",
    error: "",
};

// signup user
export const signup = createAsyncThunk(
    "auth/signup",
    async (data: ISignupPayload, { rejectWithValue }) => {
        try {
            const response = await handleSignupApi(data);
            console.log("\n:: authSlice => response: ", response);
            return response.message;
        } catch (error) {
            console.log("\n:: Error => authSlice => signup: ", error);
            return rejectWithValue(error);
        }
    }
);

// signin user
export const signin = createAsyncThunk(
    "auth/signin",
    async (data: ISigninPayload, { rejectWithValue }) => {
        try {
            const response = await handleSigninApi(data);
            console.log("\n:: authSlice => response: ", response);
            const resData = response.data as IAccessToken;
            localStorage.setItem("access_token", resData.accessToken);
            localStorage.setItem("isLoggedIn", "true");
            return response.message;
        } catch (error) {
            console.log("\n:: Error => authSlice => signin: ", error);
            return rejectWithValue(error);
        }
    }
);

// current user
export const currentUser = createAsyncThunk("auth/currentUser", async () => {
    try {
        const response = await handleGetCurrentUserApi();
        return response;
    } catch (error) {
        console.log("\n:: Error => authSlice => currentUser: ", error);
        throw error;
    }
});

// signout user
export const signout = createAsyncThunk("auth/signout", async () => {
    try {
        const response = await handleSignoutApi();
        if (response) {
            localStorage.setItem("isLoggedIn", "false");
            return response.message;
        }
    } catch (error) {
        console.log("\n:: Error => authSlice => signout: ", error);
        throw error;
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // signup
            .addCase(signup.pending, (state) => {
                state.status = "loading";
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = {} as IUserData;
                state.message = action.payload;
                state.error = "";
            })
            .addCase(signup.rejected, (state, action) => {
                state.status = "failed";
                state.data = {} as IUserData;
                state.message = "";
                state.error = action.payload as string;
            })

            // signin
            .addCase(signin.pending, (state) => {
                state.status = "loading";
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = {} as IUserData;
                state.message = action.payload;
                state.isLoggedIn = "true";
                state.error = "";
            })
            .addCase(signin.rejected, (state, action) => {
                state.status = "failed";
                state.data = {} as IUserData;
                state.message = "";
                state.error = action.payload as string;
            })

            // current user
            .addCase(currentUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(currentUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload!;
                state.error = "";
            })
            .addCase(currentUser.rejected, (state, action) => {
                state.status = "failed";
                state.data = {} as IUserData;
                state.message = "";
                state.error = action.payload as string;
            })

            // signout
            .addCase(signout.pending, (state) => {
                state.status = "loading";
            })
            .addCase(signout.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = {} as IUserData;
                state.message = action.payload!;
                state.isLoggedIn = "false";
                state.error = "";
            })
            .addCase(signout.rejected, (state, action) => {
                state.status = "failed";
                state.data = {} as IUserData;
                state.message = "";
                state.error = action.payload as string;
            });
    },
});

export const getAuthStatus = (state: typeof rootState) => state.auth.status;
export const getAuthData = (state: typeof rootState) => state.auth.data;
export const getAuthError = (state: typeof rootState) => state.auth.error;
export const getLoginStatus = (state: typeof rootState) =>
    state.auth.isLoggedIn;
export default authSlice.reducer;
