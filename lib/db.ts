import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI not defined");
}

client = new MongoClient(uri);
clientPromise = client.connect();

export default clientPromise;
