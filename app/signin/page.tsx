import { getLoggedInUser } from "@/lib/server/appwrite";
import { signInWithGoogle } from "@/lib/server/oauth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const user = await getLoggedInUser();
  console.log(user);
  if (user) {
    redirect("/account");
  }

  return (
    <div>
      <h1>Sign In</h1>
      <form action={signInWithGoogle}>
        <button type="submit">
          <span>Sign up with Google</span>
        </button>
      </form>
    </div>
  );
}
