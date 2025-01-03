import { Databases, ID, Query } from "node-appwrite";
import { client, DATABASE_ID } from "../config";

const COLLECTION_ID = "events";

const database = new Databases(client);

export async function getEventsForUser(user: any) {
  try {
    return await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.contains("participantIds", user.$id),
    ]);
  } catch (e) {
    console.error(e);
  }
}

export async function getEventById(id: string) {
  try {
    return await database.getDocument(DATABASE_ID, COLLECTION_ID, id);
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function createEvent({
  name,
  description,
  creatorId,
}: {
  name: string;
  description: string;
  creatorId: string;
}) {
  try {
    return await database.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      {
        name,
        description,
        creatorId,
        participantIds: [creatorId],
      }
    );
  } catch (e) {
    console.error(e);
  }
}
