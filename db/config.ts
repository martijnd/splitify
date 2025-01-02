import { Client } from "node-appwrite";

export const DATABASE_ID = "6776fc17003d8798a7ee";

export const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
  .setKey(process.env.NEXT_APPWRITE_KEY as string);
