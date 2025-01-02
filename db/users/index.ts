import { Databases, ID, Query } from "node-appwrite";
import { client, DATABASE_ID } from "../config";

const COLLECTION_ID = "users";

const database = new Databases(client);

export async function createUser({
  userId,
  name,
  email,
}: {
  userId: string;
  name: string;
  email: string;
}) {
  try {
    return database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
      userId,
      name,
      email,
    });
  } catch (e) {
    console.error(e);
  }
}

export async function findOrCreateUser({
  userId,
  name,
  email,
}: {
  userId: string;
  name: string;
  email: string;
}) {
  const user = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
    Query.equal("userId", userId),
  ]);
  if (user.documents.length > 0) {
    return user.documents[0];
  }

  return createUser({ userId, name, email });
}
