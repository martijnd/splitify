import { getEventById } from "@/db/models/events";
import { notFound } from "next/navigation";

export default async function ShowEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  "use server";
  const id = (await params).id;
  const event = await getEventById(id);
  if (!event) return notFound();
  return <h1>{event.name}</h1>;
}
