
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC-Ir9Jt6cYBNHrvUGspznvGVMSaX59avs",
  authDomain: "fitcheck-86c27.firebaseapp.com",
  projectId: "fitcheck-86c27",
  storageBucket: "fitcheck-86c27.firebasestorage.app",
  messagingSenderId: "616664580407",
  appId: "1:616664580407:web:5c0f242b01010b7b6c9ab2",
  measurementId: "G-7QQZMWZ5JQ"
};


const app = initializeApp(firebaseConfig);

export default app; 