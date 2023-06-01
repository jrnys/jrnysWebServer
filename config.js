import dotenv from 'dotenv';
import assert from 'assert';

dotenv.config();

// adding init assertions
// assert(PORT, "Application port is required");
// assert(HOST_URL, "Service endpoint is required");
// assert(DATABASE_URL, "Firebase database endpoint is required");
// assert(PROJECT_ID, "Firebase project id is required");
// assert(APP_ID, "Firebase app id is required");

const config = {
  port: process.env.PORT,
  host: process.env.HOST,
  url: process.env.HOST_URL,
  firebaseConfig: {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
  }
};

export default config;
