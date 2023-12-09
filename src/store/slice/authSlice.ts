import {
    handleSigninApi,
    handleSignupApi,
    handleSignoutApi,
    handleVerifyOTPApi,
    handleVerifyEmailApi,
    handleResetPasswordApi,
    handleGetCurrentUserApi,
    handleChangePasswordApi,
    handleSigninWithGoogleApi,
} from "@api/users.api";
import {
    IUserData,
    ISigninPayload,
    ISignupPayload,
    IVerifyEmailPayload,
    IChangePasswordPayload,
    IResetPasswordApiPayload,
    AuthStateStatus,
} from "src/types/auth.types";
import { rootState } from "@store/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    status: AuthStateStatus;
    data: IUserData;
    isSignedIn: boolean;
    verifiedEmail: string;
    message: string;
    error: string;
}

const initialState: IInitialState = {
    status: "idle",
    data: {} as IUserData,
    isSignedIn: localStorage.getItem("isSignedIn") === "true",
    verifiedEmail: "",
    message: "",
    error: "",
};

// signup user
export const signup = createAsyncThunk(
    "auth/signup",
    async (data: ISignupPayload) => {
        const response = await handleSignupApi(data);
        return response;
    }
);

// signin user
export const signin = createAsyncThunk(
    "auth/signin",
    async (data: ISigninPayload) => {
        const response = await handleSigninApi(data);
        localStorage.setItem("access_token", response.accessToken);
        localStorage.setItem("isSignedIn", "true");
        return response.message;
    }
);

// signin with google
export const signinWithGoogle = createAsyncThunk(
    "auth/google",
    async (code: string) => {
        const response = await handleSigninWithGoogleApi(code);
        localStorage.setItem("access_token", response.accessToken);
        localStorage.setItem("isSignedIn", "true");
        return response.message;
    }
);

// current user
export const currentUser = createAsyncThunk("auth/currentUser", async () => {
    const response = await handleGetCurrentUserApi();
    return response;
});

// signout user
export const signout = createAsyncThunk("auth/signout", async () => {
    const response = await handleSignoutApi();
    localStorage.clear();
    return response;
});

// change password
export const changePassword = createAsyncThunk(
    "auth/change-password",
    async (data: IChangePasswordPayload) => {
        const response = await handleChangePasswordApi(data);
        return response;
    }
);

// verify email
export const verifyEmail = createAsyncThunk(
    "auth/verify-email",
    async (data: IVerifyEmailPayload) => {
        const response = await handleVerifyEmailApi(data);
        return response;
    }
);

// verify OTP
export const verifyOTP = createAsyncThunk(
    "auth/verify-otp",
    async (otp: string) => {
        const response = await handleVerifyOTPApi(otp);
        return response;
    }
);

// reset Password
export const resetPassword = createAsyncThunk(
    "auth/reset-password",
    async (data: IResetPasswordApiPayload) => {
        const response = await handleResetPasswordApi(data);
        return response;
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetVerifiedEmail: (state) => {
            state.status = "idle";
            state.message = "";
            state.verifiedEmail = "";
        },
    },
    extraReducers: (builder) => {
        builder
            // signup
            .addCase(signup.pending, (state) => {
                state.status = "loading";
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = {} as IUserData;
                state.message = action.payload.message;
                state.error = "";
            })
            .addCase(signup.rejected, (state, action) => {
                state.status = "failed";
                state.data = {} as IUserData;
                state.message = "";
                state.error = action.error.message!;
            })

            // signin
            .addCase(signin.pending, (state) => {
                state.status = "loading";
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = {} as IUserData;
                state.message = action.payload;
                state.isSignedIn = true;
                state.error = "";
            })
            .addCase(signin.rejected, (state, action) => {
                state.status = "failed";
                state.data = {} as IUserData;
                state.message = "";
                state.error = action.error.message!;
            })

            // signin with google
            .addCase(signinWithGoogle.pending, (state) => {
                state.status = "loading";
            })
            .addCase(signinWithGoogle.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = {} as IUserData;
                state.message = action.payload;
                state.isSignedIn = true;
                state.error = "";
            })
            .addCase(signinWithGoogle.rejected, (state, action) => {
                state.status = "failed";
                state.data = {} as IUserData;
                state.message = "";
                state.error = action.error.message!;
            })

            // current user
            .addCase(currentUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(currentUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload.currentUser;
                state.message = action.payload.message;
                state.error = "";
            })
            .addCase(currentUser.rejected, (state, action) => {
                state.status = "failed";
                state.data = {} as IUserData;
                state.message = "";
                state.error = action.error.message!;
            })

            // signout
            .addCase(signout.pending, (state) => {
                state.status = "loading";
            })
            .addCase(signout.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = {} as IUserData;
                state.isSignedIn = false;
                state.message = action.payload.message;
                state.error = "";
            })
            .addCase(signout.rejected, (state, action) => {
                state.status = "failed";
                state.data = {} as IUserData;
                state.message = "";
                state.error = action.error.message!;
            })

            // change password
            .addCase(changePassword.pending, (state) => {
                state.status = "loading";
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.message = action.payload.message;
                state.error = "";
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.status = "failed";
                state.message = "";
                state.error = action.error.message!;
            })

            // verify email
            .addCase(verifyEmail.pending, (state) => {
                state.status = "loading";
            })
            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.verifiedEmail = action.payload.email;
                state.message = action.payload.message;
                state.error = "";
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.status = "failed";
                state.message = "";
                state.verifiedEmail = "";
                state.error = action.error.message!;
            })

            // verify OTP
            .addCase(verifyOTP.pending, (state) => {
                state.status = "loading";
            })
            .addCase(verifyOTP.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.message = action.payload.message;
                state.error = "";
            })
            .addCase(verifyOTP.rejected, (state, action) => {
                state.status = "failed";
                state.message = "";
                state.error = action.error.message!;
            })

            // reset password
            .addCase(resetPassword.pending, (state) => {
                state.status = "loading";
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.verifiedEmail = "";
                state.message = action.payload.message;
                state.error = "";
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.status = "failed";
                state.message = "";
                state.error = action.error.message!;
            });
    },
});

export const getAuthStatus = (state: typeof rootState) => state.auth.status;
export const getAuthMessage = (state: typeof rootState) => state.auth.message;
export const getAuthData = (state: typeof rootState) => state.auth.data;
export const getAuthError = (state: typeof rootState) => state.auth.error;
export const getSigninStatus = (state: typeof rootState) =>
    state.auth.isSignedIn;
export const getVerifiedEmail = (state: typeof rootState) =>
    state.auth.verifiedEmail;

export const { resetVerifiedEmail } = authSlice.actions;
export default authSlice.reducer;
