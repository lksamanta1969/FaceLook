import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBrIafM3t1lZeMvu-gi4McPyq0AvCCpnf8",
  authDomain: "facelook-e2717.firebaseapp.com",
  projectId: "facelook-e2717",
  storageBucket: "facelook-e2717.firebasestorage.app", 
  messagingSenderId: "254789334698",
  appId: "1:254789334698:web:928145f9f83a90f05782d3"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);