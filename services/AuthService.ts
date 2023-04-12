import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

export function getAuthorizationHeader() {
    const currentUser = Cookies.get("currentUser");

    return {
        Authorization: `Bearer ${
            JSON.parse(currentUser || "")?.accessToken || ""
        }`,
    };
}

export class AuthService {
    protected readonly instance: AxiosInstance;
    public constructor(url: string) {
        this.instance = axios.create({
            baseURL: url,
            timeout: 30000,
            timeoutErrorMessage: "Time out!",
        });
    }

    login = (username: string, password: string) => {
        return this.instance
            .post("/login", {
                username,
                password,
            })
            .then((res) => {
                return {
                    username: res.data.username,
                    avatar: res.data.avatar,
                    id: res.data.userId,
                    accessToken: res.data.access_token,
                    expiredAt: res.data.expiredAt,
                };
            });
    };

    getUser = (userID: string) => {
        return this.instance
            .get(`/users/${userID}`, {
                headers: getAuthorizationHeader(),
            })
            .then((res) => {
                return res.data;
            });
    };

    uploadAvatar = (userID: string, newAvatar: File) => {
        const formData = new FormData();
        formData.append("file", newAvatar);

        return this.instance
            .post(`/users/${userID}/upload`, formData, {
                headers: getAuthorizationHeader(),
            })
            .then((res) => {
                return { newAvatar: res.data.data.url };
            });
    };
}
