import { IUserData } from "./auth.types";

export interface IAccessToken {
    accessToken: string;
}

export interface IAxiosResponseData {
    statusCode: number;
    message: string;
    data: IUserData | IAccessToken;
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
        };
    };
    request?: XMLHttpRequest;
    message: string;
}
