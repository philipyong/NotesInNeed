import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9h5gQhDfLWNLTGDWwgfErwyIZswBVDqg",
  authDomain: "notes-in-need.firebaseapp.com",
  databaseURL: "https://notes-in-need.firebaseio.com",
  projectId: "notes-in-need",
  storageBucket: "notes-in-need.appspot.com",
  messagingSenderId: "996301031850",
  appId: "1:996301031850:web:1dc255a04ecfdd065a03d3",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
