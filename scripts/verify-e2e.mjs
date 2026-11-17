import { connectToMongoDB, disconnectFromMongoDB } from '../server/db.js';

async function verify() {
  console.log('Connecting to MongoDB Atlas...');
  const client = await connectToMongoDB();
  const db = client.db('sng_agency');
  const collections = await db.listCollections().toArray();
  console.log('Collections in database sng_agency:');
  for (const c of collections) {
    const count = await db.collection(c.name).countDocuments();
    console.log(` - ${c.name}: ${count} documents`);
  }
  await disconnectFromMongoDB();
  console.log('Verification completed successfully!');
}

verify().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});

