import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.database();
}

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
