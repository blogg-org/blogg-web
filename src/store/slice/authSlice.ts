import { rootState } from "@store/store";
import { handleSignupApi } from "@api/users.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISigninPayload, ISignupPayload, IUserData } from "src/types/auth.types";

interface IInitialState {
    status: "idle" | "loading" | "succeeded" | "failed";
    data: IUserData;
    error: string;
}

const initialState: IInitialState = {
    status: "idle",
    data: {},
    error: "",
};

// signup user
export const signup = createAsyncThunk("auth/signup", async (data: ISignupPayload): Promise<IUserData> => {
    try {
        const resData = await handleSignupApi(data);
        const { _id, fullname, email } = (await resData.data) as IUserData;
        return { _id, fullname, email };
    } catch (error) {
        console.log("\n:: Error => authSlice => signup: ", error);
        throw error;
    }
});

// signin user
export const signin = createAsyncThunk("auth/signin", (data: ISigninPayload) => {
    console.log(data);
    return { email: data.email };
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
                state.data = { ...action.payload };
                state.error = "";
            })
            .addCase(signup.rejected, (state, action) => {
                state.status = "failed";
                state.data = {};
                state.error = action.error?.message ?? "sign up error";
            })

            // signin
            .addCase(signin.pending, (state) => {
                state.status = "loading";
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
                state.error = "";
            })
            .addCase(signin.rejected, (state, action) => {
                state.status = "failed";
                state.data = {};
                state.error = action.error?.message ?? "sign up error";
            });
    },
});

export const getAuthStatus = (state: typeof rootState) => state.auth.status;
export const getAuthData = (state: typeof rootState) => state.auth.data;
export const getAuthError = (state: typeof rootState) => state.auth.error;

export default authSlice.reducer;
