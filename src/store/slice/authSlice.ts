import { rootState } from "@store/store";
import { handleSigninApi, handleSignupApi } from "@api/users.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISigninPayload, ISignupPayload, IUserData } from "src/types/auth.types";

export interface ISignupResponse {
    message: string;
}

interface IInitialState {
    status: "idle" | "loading" | "succeeded" | "failed";
    data: IUserData;
    message: string;
    error: string;
}

const initialState: IInitialState = {
    status: "idle",
    data: {} as IUserData,
    message: "",
    error: "",
};

// signup user
export const signup = createAsyncThunk("auth/signup", async (data: ISignupPayload, { rejectWithValue }) => {
    try {
        const response = await handleSignupApi(data);
        console.log("\n:: authSlice => response: ", response);
        return response.message;
    } catch (error) {
        console.log("\n:: Error => authSlice => signup: ", error);
        return rejectWithValue(error);
    }
});

// signin user
export const signin = createAsyncThunk("auth/signin", async (data: ISigninPayload, { rejectWithValue }) => {
    try {
        const response = await handleSigninApi(data);
        console.log("\n:: authSlice => response: ", response);
        return response.message;
    } catch (error) {
        console.log("\n:: Error => authSlice => signin: ", error);
        return rejectWithValue(error);
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
                state.error = "";
            })
            .addCase(signin.rejected, (state, action) => {
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

export default authSlice.reducer;
