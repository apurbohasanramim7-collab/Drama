import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

// Replace with your actual Firebase config from the Firebase Console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);

/**
 * FIRESTORE SECURITY RULES (Example)
 * 
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     match /Dramas/{dramaId} {
 *       allow read: if true;
 *       allow write: if false; // Admin only via console
 *     }
 *     match /Dramas/{dramaId}/Episodes/{episodeId} {
 *       allow read: if true;
 *       allow write: if false;
 *     }
 *     match /Users/{userId} {
 *       allow read, write: if request.auth != null && request.auth.uid == userId;
 *     }
 *   }
 * }
 */
