export interface ISignupPayload {
    fullname: string;
    email: string;
    password: string;
}

export interface ISigninPayload {
    email: string;
    password: string;
}

export interface IChangePasswordPayload {
    oldPassword: string;
    newPassword: string;
}

export interface IUserData {
    _id: string;
    fullname: string;
    email: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
}
