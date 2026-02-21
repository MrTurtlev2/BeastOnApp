export interface IUser {
    id: number;
    customerName: string;
    email: string;
    role: string;
}

export interface IUserState {
    userData: IUser | null;
    isLoggedIn: boolean;
    accessToken: string | null;
}

export interface IUserLoginState {
    user: IUser;
    accessToken: string | null;
}
