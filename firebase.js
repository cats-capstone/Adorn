import * as firebase from 'firebase';
import * as f from './secrets';

export const config = {
  apiKey: f.FIREBASE_API_KEY,
  authDomain: f.FIREBASE_AUTH_DOMAIN,
  databaseURL: f.FIREBASE_DATABASE_URL,
  projectId: f.FIREBASE_PROJECT_ID,
  storageBucket: f.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: f.FIREBASE_MESSAGING_SENDER_ID,
  appId: f.FIREBASE_APP_ID,
};

firebase.initializeApp(config);

export const database = firebase.database();