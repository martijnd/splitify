import { createAdminClient, getLoggedInUser } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/server/constants";
import { findOrCreateUser } from "@/db/users";

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

  (await cookies()).set(SESSION_COOKIE, session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  const user = await getLoggedInUser();
  if (!user) {
    throw new Error("Session not found");
  }
  await findOrCreateUser({
    userId: user.$id,
    name: user.name,
    email: user.email,
  });

  return NextResponse.redirect(`${request.nextUrl.origin}/account`);
}
