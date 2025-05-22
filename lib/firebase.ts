// src/lib/firebase.ts
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

// TODO: Замените эти значения на конфигурацию вашего Firebase проекта!
// Вы можете найти их в консоли Firebase -> Настройки проекта -> Общие -> Ваши приложения -> Конфигурация SDK.
const firebaseConfig = {
  apiKey: "AIzaSyDiV_ozjhBsPT7OpQPeh7sP-m2isVkVp7E",
  authDomain: "studentpulse-tpkb9.firebaseapp.com",
  projectId: "studentpulse-tpkb9",
  storageBucket: "studentpulse-tpkb9.firebasestorage.app",
  messagingSenderId: "989276246981",
  appId: "1:989276246981:web:4d7dc264df816f403b71ac"
  // measurementId: "YOUR_MEASUREMENT_ID" // Опционально, если используете Google Analytics
};

// Инициализация Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const db: Firestore = getFirestore(app);

export { db, app }; // Экспортируем db и app
