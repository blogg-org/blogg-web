export interface ISignupPayload {
    fullname: string;
    email: string;
    password: string;
}

export interface ISigninPayload {
    email: string;
    password: string;
}

export interface IUserData {
    _id?: string;
    fullname?: string;
    email?: string;
}
