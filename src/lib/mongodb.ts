import { MongoClient } from "mongodb";

const uri =  process.env.MONGODB_URI as string;
// "mongodb+srv://ghalibajiz:8WXsE9c6hSSRaCdF@cluster.ade0w.mongodb.net/"
console.log(uri)
if (!uri) {
  throw new Error(" MongoDB URI is missing in .env.local");
}

const client = new MongoClient(uri);
const clientPromise = client.connect();

export { clientPromise};
