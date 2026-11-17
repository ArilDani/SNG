import { MongoClient } from 'mongodb';
import dns from 'dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);

const uri = "mongodb+srv://arildani60_db_user:8Ia7BxfSAWAS5Ewk@cluster0.ol7ptsz.mongodb.net/?retryWrites=true&w=majority";

async function test(opts, name) {
  console.log(`Testing ${name}...`);
  const client = new MongoClient(uri, opts);
  try {
    await client.connect();
    console.log(`Success with ${name}!`);
    await client.close();
    return true;
  } catch (err) {
    console.log(`Failed with ${name}:`, err.message);
    return false;
  }
}

async function run() {
  await test({}, 'default');
  await test({ tlsAllowInvalidCertificates: true }, 'tlsAllowInvalidCertificates');
  await test({ tls: true, tlsInsecure: true }, 'tlsInsecure');
}

run();

