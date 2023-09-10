import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCjmx1CluM5o80NI9GAqKgnXTBKEOGjbSM",
  authDomain: "chatapponreact.firebaseapp.com",
  projectId: "chatapponreact",
  storageBucket: "chatapponreact.appspot.com",
  messagingSenderId: "180242030175",
  appId: "1:180242030175:web:6f77f32819fa3c81ab85ea",
  measurementId: "G-PKM1E3MD9F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();

export{auth,db,storage}