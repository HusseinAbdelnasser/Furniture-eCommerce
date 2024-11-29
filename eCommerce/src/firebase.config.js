
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDJ2txqZGIxHh1nZC4mxt8BPKAKQ6O8tQ8",
  authDomain: "furniture-store-db3ca.firebaseapp.com",
  projectId: "furniture-store-db3ca",
  storageBucket: "furniture-store-db3ca.firebasestorage.app",
  messagingSenderId: "206431711201",
  appId: "1:206431711201:web:3658da5698b1a6a7c76ca0"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;