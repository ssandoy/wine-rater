import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.database();
}

export const auth = firebase.auth();
export const db = firebase.database();
export const storage = firebase.storage();

export const snapshotToArray = snapshot => {
  const returnArr = [];

  snapshot.forEach(function(childSnapshot) {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    // fixme
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    returnArr.push(item);
  });

  return returnArr;
};
