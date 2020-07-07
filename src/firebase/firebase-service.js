import firebase from "@firebase/app";
import "@firebase/database";
import "@firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

class FirebaseService {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.database = firebase.database();
    this.storage = firebase.storage();
    this.storageRef = this.storage.ref();
    this.storeWineToFirebase = this.storeWineToFirebase.bind(this);
    this.allWines = this.allWines.bind(this);
    this.wine = this.wine.bind(this);
    this.snapshotToArray = this.snapshotToArray.bind(this);
  }

  async storeWineToFirebase(wineItem) {
    try {
      const response = await this.database.ref("wines/").push(wineItem);
      return response.key;
    } catch (error) {
      return -1;
    }
  }

  async login(password) {
    try {
      const isSuccessfulLogin = await this.database.ref("login/");
      return isSuccessfulLogin;
    } catch (e) {
      return false;
    }
  }

  allWines() {
    return this.database.ref("wines").once("value");
  }

  async wine(uid) {
    let wine;
    await this.database.ref(`wines`).once("value", snapshot => {
      wine = snapshot.val()[uid];
    });
    return wine;
  }

  snapshotToArray(snapshot) {
    const returnArr = [];

    snapshot.forEach(function(childSnapshot) {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;

      returnArr.push(item);
    });

    return returnArr;
  }

  // todo.
  uploadImage = (imageRefName, filename, image) => {
    const imageRef = this.storageRef.child(imageRefName);
    const uploadRef = imageRef.child(filename);
    const imageUrl = uploadRef.put(image).then(
      success => {
        return success.ref.getDownloadURL();
      },
      error => {
        // TODO ADD ERRORHANDLING...
      }
    );
    return imageUrl;
  };
}

export default FirebaseService;
