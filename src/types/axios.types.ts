// import { IUserData } from "./auth.types";
// import { IPostFromDB } from "./blogs.types";

export interface IAccessToken {
    accessToken: string;
}

export interface IEmail {
    email: string;
}

export interface IAxiosResponseData<T> {
    statusCode: number;
    message: string;
    data: T;
    success: boolean;
}

export interface IAxiosError {
    code?: string;
    response?: {
        data: {
            statusCode: number;
            message: string;
            data?: null;
            success: boolean;
            errors?: string[] | [];
            stack?: string;
        };
    };
    request?: XMLHttpRequest;
    message: string;
}
