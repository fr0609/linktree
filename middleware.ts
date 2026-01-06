import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const DEFAULT_USER = "admin";
const DEFAULT_PASSWORD = "linktree-admin";

function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return false;
  }

  const encoded = authHeader.split(" ")[1] ?? "";
  let decoded = "";
  try {
    decoded = atob(encoded);
  } catch {
    return false;
  }

  const separatorIndex = decoded.indexOf(":");
  if (separatorIndex === -1) {
    return false;
  }

  const user = decoded.slice(0, separatorIndex);
  const password = decoded.slice(separatorIndex + 1);

  const expectedUser = process.env.ADMIN_USER || DEFAULT_USER;
  const expectedPassword = process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;

  return user === expectedUser && password === expectedPassword;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/api/links")) {
    if (request.method === "GET" || request.method === "HEAD") {
      return NextResponse.next();
    }
  }

  if (isAuthorized(request)) {
    return NextResponse.next();
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": "Basic realm=\"Linktree Admin\""
    }
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/links"]
};
