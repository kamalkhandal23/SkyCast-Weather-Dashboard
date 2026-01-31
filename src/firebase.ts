// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8a_yp0kUnxuYgA2-JHr8-3PAwBgO9vEA",
  authDomain: "weather-dashboard-e7a37.firebaseapp.com",
  projectId: "weather-dashboard-e7a37",
  storageBucket: "weather-dashboard-e7a37.firebasestorage.app",
  messagingSenderId: "602101612830",
  appId: "1:602101612830:web:2c9b17b9a997ed9e12890f",
  measurementId: "G-JJCSE4XYGG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);