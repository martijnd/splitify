"use server";

import { createAdminClient } from "./appwrite";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { OAuthProvider } from "node-appwrite";

export async function signInWithGoogle() {
  const { account } = await createAdminClient();

  const origin = (await headers()).get("origin");
  const successUrl = `${origin}/oauth`;
  const failureUrl = `${origin}/signin`;

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    successUrl,
    failureUrl
  );

  redirect(redirectUrl);
}
