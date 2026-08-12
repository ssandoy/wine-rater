import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { DataSnapshot, getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getDatabase(firebaseApp);
export const storage = getStorage(firebaseApp);

export const snapshotToArray = <T extends object>(
  snapshot: DataSnapshot
): Array<T & { key: string }> => {
  const returnArr: Array<T & { key: string }> = [];

  snapshot.forEach(childSnapshot => {
    const item = childSnapshot.val() as T | null;
    if (item && childSnapshot.key) {
      returnArr.push({ ...item, key: childSnapshot.key });
    }
  });

  return returnArr;
};
