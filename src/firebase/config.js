// Import the functions you need from the SDKs you need
import { setDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
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
export const firebaseApp = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage(firebaseApp);

export const saveUser = async (res) => {
  const userRef = doc(db, "users", res.user.uid);
  const uid = res.user.uid;
  const displayName = res.user.displayName;
  const photoUrl = res.user.providerData[0].photoURL;
  localStorage.setItem("id", uid);
  const userMail = res.user.email;
  console.log(
    "ID",
    uid,
    "NAME",
    displayName,
    "PHOTO",
    photoUrl,
    "EMAIL",
    userMail
  );
  await setDoc(userRef, {
    userID: uid,
    userName: displayName,
    photoURL: photoUrl,
    biography: "Human",
    userMail: userMail,
  });
};

export const getPhoto = async (id) => {
  const userRef = doc(db, `users/${id}`);
  getDoc(userRef).then((doc) => {
    console.log(doc.data());
  });
};
