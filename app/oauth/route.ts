import { createAdminClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/server/constants";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  const secret = request.nextUrl.searchParams.get("secret");

  if (!userId || !secret) {
    return new NextResponse("OAuth2 did not provide token", { status: 400 });
  }

  const { account } = await createAdminClient();
  const session = await account.createSession(userId, secret);

  if (!session || !session.secret) {
    return new NextResponse("Failed to create session from token", {
      status: 400,
    });
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
  const response = NextResponse.redirect(`${request.nextUrl.origin}/account`);
  response.cookies.set(SESSION_COOKIE, session.secret);
  return response;
}
