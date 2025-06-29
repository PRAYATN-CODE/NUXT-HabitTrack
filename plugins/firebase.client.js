import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin(() => {

    const firebaseConfig = {
        apiKey: "AIzaSyD5iIdAyqdkutNLQ0AKSswSHdrOQyVOplA",
        authDomain: "habitstore-e67f9.firebaseapp.com",
        projectId: "habitstore-e67f9",
        storageBucket: "habitstore-e67f9.firebasestorage.app",
        messagingSenderId: "956706250619",
        appId: "1:956706250619:web:dcd5eed7f30c987c4e27de"
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app)

    return {
        provide: {
            firebaseApp: app,
            db: db,
        }
    }
})
