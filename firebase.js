// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRpw3ZS9N3c5479gTsL5LSOqES01--yNs",
  authDomain: "ecommerce-db27e.firebaseapp.com",
  projectId: "ecommerce-db27e",
  storageBucket: "ecommerce-db27e.appspot.com",
  messagingSenderId: "578323054723",
  appId: "1:578323054723:web:ec3e0e02b59d9cbc095bb6",
  measurementId: "G-JT99W0RWG1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, app, auth, storage }
