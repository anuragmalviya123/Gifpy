import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtlHKauCxIMqIWf42Pc4-9SsreNXyYRic",
  authDomain: "react-authentication-88d57.firebaseapp.com",
  projectId: "react-authentication-88d57",
  storageBucket: "react-authentication-88d57.appspot.com",
  messagingSenderId: "194239726623",
  appId: "1:194239726623:web:992f6225e1528182e5012a",
  measurementId: "G-N3NFJJ6XFZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;