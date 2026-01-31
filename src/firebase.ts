// Import the functions you need from the SDKs you need



// Initialize Firebase
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8a_yp0kUnxuYgA2-JHr8-3PAwBgO9vEA",
  authDomain: "weather-dashboard-e7a37.firebaseapp.com",
  projectId: "weather-dashboard-e7a37",
  storageBucket: "weather-dashboard-e7a37.firebasestorage.app",
  messagingSenderId: "602101612830",
  appId: "1:602101612830:web:2c9b17b9a997ed9e12890f",
  measurementId: "G-JJCSE4XYGG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

