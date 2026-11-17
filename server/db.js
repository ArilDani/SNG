import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'dns';

// Fix Windows Node.js DNS SRV resolution for MongoDB Atlas
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  console.warn('Could not set custom DNS servers, using system default:', e.message);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load credentials from atlas-credentials.env
dotenv.config({ path: path.resolve(__dirname, '../atlas-credentials.env') });

const username = process.env.MONGODB_USERNAME || 'arildani60_db_user';
const password = encodeURIComponent(process.env.MONGODB_PASSWORD || '8Ia7BxfSAWAS5Ewk');

const rawUri = process.env.MONGODB_URI || "mongodb+srv://<db_username>:<db_password>@cluster0.ol7ptsz.mongodb.net/";
const connectionString = rawUri.includes('<db_username>')
  ? rawUri.replace('<db_username>', username).replace('<db_password>', password)
  : (rawUri.includes('@') ? rawUri : `mongodb+srv://${username}:${password}@cluster0.ol7ptsz.mongodb.net/?retryWrites=true&w=majority`);

export const client = new MongoClient(connectionString);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
    throw err;
  }
}

// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  await client.close();
}
