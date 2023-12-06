import { Location } from "react-router-dom";

export type StateStatus = "idle" | "loading" | "succeeded" | "failed";
export type AuthStateStatus = StateStatus;

export type Message = string;
export type Email = string;
export type Password = string;

export interface ISignupPayload {
    fullname: string;
    email: Email;
    password: Password;
}

export interface ISignupResponse {
    message: Message;
}

export interface ISigninPayload {
    email: Email;
    password: Password;
}

export interface IChangePasswordPayload {
    oldPassword: Password;
    newPassword: Password;
}

export interface IVerifyEmailPayload {
    email: Email;
}

export interface IResetPasswordPayload {
    newPassword: Password;
}

export interface IResetPasswordApiPayload {
    email: Email;
    newPassword: Password;
}

export interface IUserData {
    _id: string;
    fullname: string;
    email: Email;
    avatar?: {
        _id?: string;
        publicId?: string;
        url: string;
    };
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
