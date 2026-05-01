import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Admin ve API rotalarını atla
  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.startsWith("/giris")) {
    return NextResponse.next();
  }

  // Bypass kodu kontrolü
  const bypass = request.cookies.get("bypass")?.value;
  if (bypass === "medoqa2024") {
    return NextResponse.next();
  }

  // URL'de bypass kodu varsa cookie yaz
  if (searchParams.get("bypass") === "medoqa2024") {
    const response = NextResponse.next();
    response.cookies.set("bypass", "medoqa2024", { maxAge: 60 * 60 * 24 * 30 });
    return response;
  }

  // Yakında sayfasına yönlendir
  if (pathname !== "/yakinda") {
    return NextResponse.redirect(new URL("/yakinda", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};