import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAp4qxruLXB2MgpDel3DPppt0bhlRC1q5Y",
  authDomain: "crud-react-39e0e.firebaseapp.com",
  projectId: "crud-react-39e0e",
  storageBucket: "crud-react-39e0e.appspot.com",
  messagingSenderId: "266162544335",
  appId: "1:266162544335:web:b34e8f121610868ec5a1ba",
};

// Initialize Firebase
const fb = initializeApp(firebaseConfig);

const db = getFirestore(fb);
export { db };
