import firebase from "@firebase/app";
import "@firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

class FirebaseService {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.database = firebase.database();
    this.storeWineToFirebase = this.storeWineToFirebase.bind(this);
    this.all_wines = this.all_wines.bind(this);
    this.wine = this.wine.bind(this);
    this.snapshotToArray = this.snapshotToArray.bind(this);
  }

  async storeWineToFirebase(wineItem) {
    debugger;
    try {
      let response = await this.database.ref("wines/").push(wineItem);
      return response.key;
    } catch {
      return -1;
    }
  }

  all_wines() {
    return this.database.ref("wines").once("value");
  }

  async wine(uid) {
    let wine;
    await this.database.ref(`wines`).once("value", snapshot => {
      wine = snapshot.val()[uid];
    });
    return wine;
  }

  // TODO: APPLY?

  snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
      var item = childSnapshot.val();
      item.key = childSnapshot.key;

      returnArr.push(item);
    });

    return returnArr;
  }
}

export default FirebaseService;
