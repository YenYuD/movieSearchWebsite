import { AuthService } from "../services/AuthService";
import Cookies from "js-cookie";
import { User } from "./useCurrentUser";

export const useLogin = () => {
    const authService = new AuthService(process.env.BASE_URL!);

    const login = async (username: string, password: string) => {
        const user = await authService.login(username, password);
        if (user) {
            Cookies.set("currentUser", JSON.stringify(user));
        }
        return user as User;
    };

    return { login };
};
