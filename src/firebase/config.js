// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
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
const firebaseApp = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const db = getFirestore();
const storage = getStorage(firebaseApp);

export async function upload(file, currentUser) {
  const fileRef = ref(storage, currentUser.uid + '.png');

  const snapshot = await uploadBytes(fileRef, file);

  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL})

  console.log("Uploaded file")
}