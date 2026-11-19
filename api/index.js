import app, { initDatabase } from '../server/server.js';

let isDbInitialized = false;

export default async function handler(req, res) {
  // Ensure database initialization is triggered
  if (!isDbInitialized) {
    try {
      await initDatabase();
      isDbInitialized = true;
    } catch (err) {
      console.warn('[Vercel Serverless] initDatabase error:', err.message);
    }
  }

  // Delegate request to Express app
  return app(req, res);
}

