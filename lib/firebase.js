import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAzQ-gaFh1kaTNgPztkUwVAt-MX_ss5WjE",
    authDomain: "realtimechat-4464e.firebaseapp.com",
    projectId: "realtimechat-4464e",
    storageBucket: "realtimechat-4464e.appspot.com",
    messagingSenderId: "299236594046",
    appId: "1:299236594046:web:da5ce3d7fd77d044e2632f",
    measurementId: "G-SJ9Q717CTP"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, firestore, auth };