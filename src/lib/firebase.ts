import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Kullanıcı tarafından sağlanan Firebase konfigürasyonu
const firebaseConfig = {
    apiKey: "AIzaSyCduLv8y3xeSWAKGKHcuG_Kqk1dyLvKnNM",
    authDomain: "doubletsoftweb.firebaseapp.com",
    projectId: "doubletsoftweb",
    storageBucket: "doubletsoftweb.firebasestorage.app",
    messagingSenderId: "508827849060",
    appId: "1:508827849060:web:b8f878b8bacd8da641aa71"
};

// Uygulamayı başlat (Singleton Pattern)
// Next.js Hot Reload sırasında tekrar tekrar başlatılmasını önler
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Firestore veritabanını dışa aktar
const db = getFirestore(app);

// Storage servisini dışa aktar
const storage = getStorage(app);

export { app, db, storage };
