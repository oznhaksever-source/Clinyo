import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Statik dosyalar ve API'yi atla
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/yakinda") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Bypass cookie kontrolü
  const bypass = request.cookies.get("bypass")?.value;
  if (bypass === "medoqa2024") {
    return NextResponse.next();
  }

  // URL'de bypass kodu varsa cookie yaz ve devam et
  const bypassParam = request.nextUrl.searchParams.get("bypass");
  if (bypassParam === "medoqa2024") {
    const response = NextResponse.next();
    response.cookies.set("bypass", "medoqa2024", {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    return response;
  }

  // Yakında sayfasına yönlendir
  return NextResponse.redirect(new URL("/yakinda", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};