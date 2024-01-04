// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSX5VQAU4oCSr_ncobZ4VQ8uIJVnGcJ-s",
  authDomain: "mindful-gurukul-234af.firebaseapp.com",
  projectId: "mindful-gurukul-234af",
  storageBucket: "mindful-gurukul-234af.appspot.com",
  messagingSenderId: "114845659353",
  appId: "1:114845659353:web:94cbb9d4bc628f6e068ec8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app