// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { getApp, getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMcqi4xwLYDszoSmrsWzVz3x3q-nPo9Tc",
  authDomain: "notion-clone-75b00.firebaseapp.com",
  projectId: "notion-clone-75b00",
  storageBucket: "notion-clone-75b00.firebasestorage.app",
  messagingSenderId: "530967739558",
  appId: "1:530967739558:web:81f7cc78feb39c683b8867",
  measurementId: "G-KN36HNKBHS"
};

// Initialize Firebase
const app =  getApps.length === 0 ? initializeApp(firebaseConfig): getApp();
const analytics = getAnalytics(app);