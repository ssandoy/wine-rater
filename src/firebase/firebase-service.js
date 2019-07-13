import firebase from "@firebase/app";
import "@firebase/database";

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
  }

  storeWineToFirebase = (id, name, type, year) => {
    this.database.ref("wines/" + id).set({
        name: name,
        type: type,
        year: year
      },
      function(error) {
        if (error) {
          alert("WRITE FAILED")
          // The write failed...
        } else {
          // Data saved successfully!
          alert("WRITE SUCCESSFUL. CHECK FIREBASE.")
        }
      }
    );
  }
  wine = uid => this.database.ref('wines/${uid}');
  // TODO: APPLY?
  wines = () => this.database.ref('wines');
}

export default FirebaseService;

// TODO: IMPLEMENT.

/*
  firebase.firestore().collection('restaurants').doc(id).get();
  
  FriendlyEats.prototype.getAllRestaurants = function(renderer) {
  var query = firebase.firestore()
      .collection('restaurants')
      .orderBy('avgRating', 'desc')
      .limit(50);

  this.getDocumentsInQuery(query, renderer);
};

  getDocumentsInQuery = function(query, renderer) {
  query.onSnapshot(function(snapshot) {
    if (!snapshot.size) return renderer.empty(); // Display "There are no restaurants".

    snapshot.docChanges().forEach(function(change) {
      if (change.type === 'removed') {
        renderer.remove(change.doc);
      } else {
        renderer.display(change.doc);
      }
    });
  });
};

  */
