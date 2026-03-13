import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/", "/login", "/register", "/invite", "/decline"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicRoute = publicRoutes.includes(pathname);

  try {
    const response = await fetch(new URL("/api/v1/auth/me", request.url), {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });

    const isAuthenticated = response.ok;

    if (!isAuthenticated && !isPublicRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (
      isAuthenticated &&
      (pathname === "/login" || pathname === "/register")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } catch {
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
