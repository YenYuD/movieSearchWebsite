import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { AuthService } from "../services/AuthService";

export type User = {
    username: string;
    expiredAt: number;
    accessToken: string;
    avatar?: string;
    id: string;
};

export const useCurrentUser = () => {
    const authService = new AuthService(process.env.BASE_URL!);

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const currentUser = Cookies.get("currentUser");
        if (currentUser) {
            setUser(JSON.parse(currentUser));
        }
    }, []);

    const refetchUser = async (userID: string) => {
        const userInfo = await authService.getUser(userID);
        const currentUser = Cookies.get("currentUser");
        if (userInfo && currentUser) {
            const newUser = {
                ...JSON.parse(currentUser),
                username: userInfo.username,
                avatar: userInfo.avatar,
            };
            Cookies.set("currentUser", JSON.stringify(newUser));
            setUser(newUser);
        }
    };

    return { user, refetchUser };
};
