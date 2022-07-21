import { getAuth, GoogleAuthProvider, signInWithRedirect, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

//Setting up the firebase config

export const firebaseConfig = {
  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_APP_ID,
  apiKey: "AIzaSyCXWH1n9IkMTFAwiBlHqTLcCVSdzGXY6k8",
  authDomain: "timetrackingapp-be7a7.firebaseapp.com",
  projectId: "timetrackingapp-be7a7",
  storageBucket: "timetrackingapp-be7a7.appspot.com",
  messagingSenderId: "920156214424",
  appId: "1:920156214424:web:5db6368caec2545f792ced",
};

const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const PUBLIC_URL = "";