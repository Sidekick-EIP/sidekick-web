// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAXCbu7QRpzrVaeRMu31V6KAWuIi4zaoOY",
    authDomain: "beta-fe19f.firebaseapp.com",
    databaseURL: "https://beta-fe19f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "beta-fe19f",
    storageBucket: "beta-fe19f.appspot.com",
    messagingSenderId: "819827115730",
    appId: "1:819827115730:web:8bc853a768a7a90faa0f0b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export default database;
