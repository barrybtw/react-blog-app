// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXoAO1SuHag2koQHF2tGOd_uomPRHHqMg",
  authDomain: "blog-app-93f8b.firebaseapp.com",
  projectId: "blog-app-93f8b",
  storageBucket: "blog-app-93f8b.appspot.com",
  messagingSenderId: "418515132537",
  appId: "1:418515132537:web:11f5b99b0dee9b3957b4a8",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const db = getFirestore();

const projectStorage = firebase.storage();
export { projectStorage };
