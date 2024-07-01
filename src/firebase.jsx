// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoYDMY13nt7Erj5Dtv0_Gpzc39ck2Wz1w",
  authDomain: "sci-mcq-frontned.firebaseapp.com",
  projectId: "sci-mcq-frontned",
  storageBucket: "sci-mcq-frontned.appspot.com",
  messagingSenderId: "246501806346",
  appId: "1:246501806346:web:a2b64dc525243c7e77aaf3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase(app);

export default app;