import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCoHKfF6ulBQKJAvqC8Pv8U_n70msmr3OE",
  authDomain: "turfbooking-cc0af.firebaseapp.com",
  projectId: "turfbooking-cc0af",
  storageBucket: "turfbooking-cc0af.firebasestorage.app",
  messagingSenderId: "606674146499",
  appId: "1:606674146499:web:07df34c6f685a1ac20fe76",
  measurementId: "G-ECM7Q9QVHK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
