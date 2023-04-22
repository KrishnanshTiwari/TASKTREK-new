import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDeu4bQlN6AAYdNwGidvTUheCvTuw5WGrM",
  authDomain: "todo-8d977.firebaseapp.com",
  projectId: "todo-8d977",
  storageBucket: "todo-8d977.appspot.com",
  messagingSenderId: "947341726092",
  appId: "1:947341726092:web:61c722f9d520459e8206a9"
};
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  export { db,auth };