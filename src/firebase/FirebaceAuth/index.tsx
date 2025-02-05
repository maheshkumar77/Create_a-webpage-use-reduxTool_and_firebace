
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyC8oiSkWDyt4g9cw1Y_Ukp1C1-Fmv_vdIg",
  authDomain: "textaditer.firebaseapp.com",
  projectId: "textaditer",
  storageBucket: "textaditer.firebasestorage.app",
  messagingSenderId: "271490482568",
  appId: "1:271490482568:web:029aa324b35b17db0b3a3d",
  measurementId: "G-D3LBB95HT1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
//const analytics = getAnalytics(app);
// const app = firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();

export {app, auth}