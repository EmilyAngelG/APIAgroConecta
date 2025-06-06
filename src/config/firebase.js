require("dotenv").config({ path: '../../.env' });

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);

initializeApp({ credential: cert(serviceAccount) });

const db = getFirestore();
module.exports = db;
