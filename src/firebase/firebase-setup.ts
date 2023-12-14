import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDDl4Kcd-d4kATdkrSGNagtECvespVrxkI",
  authDomain: "wine-ratings-45951.firebaseapp.com",
  databaseURL: "https://wine-ratings-45951.firebaseio.com",
  projectId: "wine-ratings-45951",
  storageBucket: "wine-ratings-45951.appspot.com",
  messagingSenderId: "479320116691",
  appId: "1:479320116691:web:55648538dcb26410"
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db =  getDatabase(app);
export const storage = getStorage(app);

export const snapshotToArray = snapshot => {
  const returnArr = [];

  snapshot.forEach(function(childSnapshot) {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    // @ts-expect-error err
    returnArr.push(item);
  });

  return returnArr;
};
