export interface ISignupData {
    name: string;
    email: string;
    password: string;
}

export interface ILoginData {
    email: string;
    password: string;
}

export interface IUserData {
    $id?: string;
    name?: string;
    email?: string;
    avatarURL?: string;
}
