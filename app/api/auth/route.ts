import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_CODE } from "@/lib/data/couple";
import {
  createSessionToken,
  verifySessionToken,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/auth/session";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const authenticated = verifySessionToken(token);
  return NextResponse.json({ authenticated });
}

export async function POST(request: NextRequest) {
  let code = "";

  try {
    const body = await request.json();
    code = typeof body?.code === "string" ? body.code : "";
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 400 });
  }

  if (code.trim() !== ACCESS_CODE) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const token = createSessionToken();
  const response = NextResponse.json({ authenticated: true });

  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
}
