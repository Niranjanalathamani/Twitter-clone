import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDdgdEglVkg4TaDRPPNrFxeYUWPNoy0h2s",
    authDomain: "twitter-clone-4f0d0.firebaseapp.com",
    projectId: "twitter-clone-4f0d0",
    storageBucket: "twitter-clone-4f0d0.firebasestorage.app",
    messagingSenderId: "288961600787",
    appId: "1:288961600787:web:3a7c16afda6df82fadcee6",
    measurementId: "G-D9XDVT2BQE"
  };

const app = initializeApp(firebaseConfig); 
const db = getFirestore(app); 
export { app };
export default db;

