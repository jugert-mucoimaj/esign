import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {

    apiKey: "AIzaSyD2CF-isbMjjGPR86Ms1eH-CnKx9_R2XHY",

    authDomain: "signing-c76b4.firebaseapp.com",

    projectId: "signing-c76b4",

    storageBucket: "signing-c76b4.firebasestorage.app",

    messagingSenderId: "507947109747",

    appId: "1:507947109747:web:b4fef556e0d2b8132e0906",

    measurementId: "G-HWSE9GVQGF"

};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { auth, googleProvider, signInWithPopup };
