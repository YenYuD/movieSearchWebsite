import { NextRequest, NextResponse } from "next/server";
import { authRoute, protectedRoute } from "./router/routes";

export async function middleware(request: NextRequest) {
    const currentUser = request.cookies.get("currentUser")?.value;

    if (
        protectedRoute.includes(request.nextUrl.pathname) &&
        (!currentUser || Date.now() > JSON.parse(currentUser).expiredAt)
    ) {
        request.cookies.delete("currentUser");
        const response = NextResponse.redirect(new URL("/Login", request.url));
        response.cookies.delete("currentUser");

        return response;
    }

    if (authRoute.includes(request.nextUrl.pathname) && currentUser) {
        return NextResponse.redirect(new URL("/mywatchList", request.url));
    }
}
