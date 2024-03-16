import { api } from "~/utils/api";
import { jwtDecode } from "jwt-decode";

interface IUser {
    id: string;
    name: string;
    email: string;
    type: string;
    companyId: string;
}

interface ILogin {
    email: string;
    password: string;
    type: string;
}

class AuthUser {
    private _user: IUser | null = null;
    private _token: string | null = null;
    private _isAuth: boolean = false;

    async login(data: ILogin) {
        
        if (!data.email || !data.password) {
            throw new Error("Email and password are required");
        }
        
        try {

            const response = await api.post('/auth/login', data);

            if (response.data.error) {
                throw new Error("Error: " + response.data.error);
            }

            this._token = response.data.data.token;
            this._isAuth = true;
            await this.setUser();
            return true;
        } catch (error) {
            console.error("Erro no login:", error);
            return false;
        }
    }

    private async setUser() {
        if (!this._token) {
            return;
        }

        const decoded = jwtDecode(this._token) as IUser;
        this._user = {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            type: decoded.type,
            companyId: decoded.companyId
        };
        console.log(this._user);
        return;
    }

    getToken() {
        return this._token;
    }

    getUser() {
        return this._user;
    }

    isAuth() {
        return this._isAuth;
    }

    logout() {
        this._user = null;
        this._token = null;
        this._isAuth = false;
    }
}

export const authUser = new AuthUser();
