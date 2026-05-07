import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, doc, deleteDoc, updateDoc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC_d5Z_0DXQdKibV35BK30futrTzE2Psnc",
    authDomain: "sky-32864696-f9b55.firebaseapp.com",
    projectId: "sky-32864696-f9b55",
    storageBucket: "sky-32864696-f9b55.firebasestorage.app",
    messagingSenderId: "765013625761",
    appId: "1:765013625761:web:283acd211c5f84a17319e0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, collection, addDoc, getDocs, query, orderBy, doc, deleteDoc, updateDoc, getDoc, setDoc, serverTimestamp };