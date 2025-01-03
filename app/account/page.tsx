import { createSessionClient, getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import { SESSION_COOKIE } from "@/lib/server/constants";

import { cookies } from "next/headers";
import { findOrCreateUser } from "@/db/models/users";
import { createEvent, getEventsForUser } from "@/db/models/events";
import { FormEvent } from "react";
import Link from "next/link";

async function signOut() {
  "use server";

  const { account } = await createSessionClient();

  (await cookies()).delete(SESSION_COOKIE);
  await account.deleteSession("current");

  redirect("/signin");
}

async function onCreateEvent(formData: FormData) {
  "use server";
  const user = await getLoggedInUser();
  if (!user) return;
  const dbUser = await findOrCreateUser(user.$id, {
    name: user.name,
    email: user.email,
  });
  if (!dbUser) return;

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  await createEvent({
    name,
    description,
    creatorId: dbUser.$id,
  });

  return redirect("/account");
}

export default async function HomePage() {
  const user = await getLoggedInUser();

  if (!user) redirect("/signin");

  const dbUser = await findOrCreateUser(user.$id, {
    name: user.name,
    email: user.email,
  });

  const events = await getEventsForUser(dbUser);

  return (
    <>
      <h1>Your account</h1>
      <span>{user.name}</span>
      <form action={signOut}>
        <button type="submit">Sign out</button>
      </form>
      <h2>Events</h2>
      <ul>
        {events?.documents.map((event) => (
          <li key={event.$id}>
            <Link href={`/events/${event.$id}`}>
              <span>{event.name}</span>{" "}
              {event.creatorId === dbUser?.$id ? (
                <span>Created by me</span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>

      <h2>Create event</h2>

      <form action={onCreateEvent}>
        <label>
          Name
          <input name="name" />
        </label>
        <label>
          Description
          <textarea name="description" />
        </label>

        <button type="submit">Create event</button>
      </form>
    </>
  );
}
