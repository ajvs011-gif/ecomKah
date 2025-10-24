// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-4fO3Iz3G52b4lMq8ClbtB7N537omANA",
  authDomain: "projetkah.firebaseapp.com",
  projectId: "projetkah",
  storageBucket: "projetkah.firebasestorage.app",
  messagingSenderId: "826454013308",
  appId: "1:826454013308:web:2efd64425c319a3648a0f9"
};

// ✅ Initialiser Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialiser Auth & GoogleAuthProvider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// ✅ Initialiser Firestore (pour ta base de données)
const db = getFirestore(app);

// ✅ Exporter tout
export { auth, googleProvider, db };