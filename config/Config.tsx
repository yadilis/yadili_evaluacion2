// config/Config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';  
import { getFirestore } from 'firebase/firestore'; 
import { getDatabase } from 'firebase/database';  

const firebaseConfig = {
  apiKey: "AIzaSyDcfbBKXIAlF0EJpo_4v2c1YNVLhB8g32A",
  authDomain: "yp-prueba.firebaseapp.com",
  projectId: "yp-prueba",
  storageBucket: "yp-prueba.appspot.com", 
  messagingSenderId: "170010601059",
  appId: "1:170010601059:web:202237aceb4e37cee33a56",
  measurementId: "G-785YBQ4PS9",
  databaseURL: "https://yp-prueba.firebaseio.com",  
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore, Realtime Database y Autenticación
export const db = getFirestore(app); 
export const auth = getAuth(app);      
export const realTimeDb = getDatabase(app);  
