import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/yakinda") ||
    pathname.startsWith("/giris") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const bypass = request.cookies.get("bypass")?.value;
  if (bypass === "medoqa2024") {
    return NextResponse.next();
  }

  const bypassParam = request.nextUrl.searchParams.get("bypass");
  if (bypassParam === "medoqa2024") {
    const response = NextResponse.next();
    response.cookies.set("bypass", "medoqa2024", {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    return response;
  }

  return NextResponse.redirect(new URL("/yakinda", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};