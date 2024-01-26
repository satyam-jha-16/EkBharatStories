// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ebsb-stories.firebaseapp.com",
  projectId: "ebsb-stories",
  storageBucket: "ebsb-stories.appspot.com",
  messagingSenderId: "221175243553",
  appId: "1:221175243553:web:557a4957469b30d51a5460"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);