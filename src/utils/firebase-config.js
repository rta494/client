import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChDthMjcyKkbzNQ-5s6S4AtEnZxyVcXnI",
  authDomain: "netflix-clone-63925.firebaseapp.com",
  projectId: "netflix-clone-63925",
  storageBucket: "netflix-clone-63925.firebasestorage.app",
  messagingSenderId: "479380477209",
  appId: "1:479380477209:web:9a16d05f11c330ac116188",
  measurementId: "G-HTBKWYNR7D",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
