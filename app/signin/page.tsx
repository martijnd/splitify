import { signInWithGoogle } from "@/lib/server/oauth";

export default async function SignInPage() {
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
