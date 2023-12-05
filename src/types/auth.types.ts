import { Location } from "react-router-dom";

export interface IAuthStateStatus {
    state: "idle" | "loading" | "succeeded" | "failed";
}

export type AuthStateStatus = "idle" | "loading" | "succeeded" | "failed";

export interface ISignupPayload {
    fullname: string;
    email: string;
    password: string;
}

export interface ISignupResponse {
    message: string;
}

export interface ISigninPayload {
    email: string;
    password: string;
}

export interface IChangePasswordPayload {
    oldPassword: string;
    newPassword: string;
}

export interface IVerifyEmailPayload {
    email: string;
}

export interface IResetPasswordPayload {
    newPassword: string;
}

export interface IResetPasswordApiPayload extends IResetPasswordPayload {
    email: string;
}

export interface IUserData {
    _id: string;
    fullname: string;
    email: string;
    avatar?: {
        _id?: string;
        publicId?: string;
        url: string;
    };
    __v: number;
    createdAt: string;
    updatedAt: string;
}

export interface ILocation extends Location {
    hash: string;
    key: string;
    pathname: string;
    search: string;
    state: null | { from: string };
}
