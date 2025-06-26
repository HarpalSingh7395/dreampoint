import { ID, Account, Client, Storage } from 'appwrite';

export const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "")
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "");

export const storage = new Storage(client);

export const account = new Account(client);
export { ID } from 'appwrite';

