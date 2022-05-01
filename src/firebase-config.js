import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4cf2N5wm64GspSuh2DaPiGGidfJu2XfU",
  authDomain: "kings-clothing-6b3ca.firebaseapp.com",
  databaseURL: "https://kings-clothing-6b3ca-default-rtdb.firebaseio.com",
  projectId: "kings-clothing-6b3ca",
  storageBucket: "kings-clothing-6b3ca.appspot.com",
  messagingSenderId: "151239121536",
  appId: "1:151239121536:web:91e89d5692a64fe6a2e465",
  measurementId: "G-74ZDLRNQPH"
  };


 const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 export const db = getFirestore(app); 

