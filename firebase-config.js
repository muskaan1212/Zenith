import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js"
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-analytics.js"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCag2n_FheSaWRUhDmYAGFfsPHO3MJOlM8",
  authDomain: "zenith-86909.firebaseapp.com",
  projectId: "zenith-86909",
  storageBucket: "zenith-86909.firebasestorage.app",
  messagingSenderId: "941537001671",
  appId: "1:941537001671:web:e1c2db0e19aa2e7414bee2",
  measurementId: "G-7X74TV6BNK",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

// Export auth and provider for use in other modules
export {
  auth,
  googleProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
}
