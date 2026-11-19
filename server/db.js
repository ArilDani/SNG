import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load credentials from atlas-credentials.env
dotenv.config({ path: path.resolve(__dirname, '../atlas-credentials.env') });

const username = process.env.MONGODB_USERNAME || 'arildani60_db_user';
const password = encodeURIComponent(process.env.MONGODB_PASSWORD || '8Ia7BxfSAWAS5Ewk');

// Standard SRV URI as requested by user
export const srvUri = `mongodb+srv://${username}:${password}@cluster0.ol7ptsz.mongodb.net/sng_agency?retryWrites=true&w=majority`;

// Direct replica-set URI (fallback in case Windows local DNS blocks SRV lookups)
export const directUri = `mongodb://${username}:${password}@ac-0d2qyfy-shard-00-00.ol7ptsz.mongodb.net:27017,ac-0d2qyfy-shard-00-01.ol7ptsz.mongodb.net:27017,ac-0d2qyfy-shard-00-02.ol7ptsz.mongodb.net:27017/sng_agency?ssl=true&replicaSet=atlas-gmwkwk-shard-0&authSource=admin&retryWrites=true&w=majority`;

export let client = null;
export let isConnectedToAtlas = false;
let isConnecting = false;

export async function connectToMongoDB() {
  if (isConnectedToAtlas && client) return client;
  if (isConnecting) return null;

  isConnecting = true;

  // Try standard SRV URI first, then direct shard URI
  const uris = [
    { name: 'MongoDB Atlas (SRV)', uri: srvUri },
    { name: 'MongoDB Atlas (Direct Replica Set)', uri: directUri }
  ];

  for (const item of uris) {
    try {
      console.log(`[MongoDB] Menghubungkan ke ${item.name}...`);
      const testClient = new MongoClient(item.uri, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000
      });
      await testClient.connect();
      client = testClient;
      isConnectedToAtlas = true;
      console.log(`[MongoDB] ✓ BERHASIL TERHUBUNG ke MongoDB Atlas via ${item.name}!`);
      isConnecting = false;
      return client;
    } catch (err) {
      console.warn(`[MongoDB] Koneksi via ${item.name} gagal (${err.message})`);
    }
  }

  isConnecting = false;
  return null;
}

export async function disconnectFromMongoDB() {
  if (client) {
    await client.close();
    isConnectedToAtlas = false;
    client = null;
  }
}
