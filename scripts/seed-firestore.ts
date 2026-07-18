import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { notifications, rewards, settings, students, transactions } from "../lib/sample-data";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

async function seed() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  await setDoc(doc(db, "settings", "classroom"), settings);
  await Promise.all(students.map((student) => setDoc(doc(collection(db, "students"), student.id), student)));
  await Promise.all(transactions.map((transaction) => setDoc(doc(collection(db, "transactions"), transaction.id), transaction)));
  await Promise.all(rewards.map((reward) => setDoc(doc(collection(db, "rewards"), reward.id), reward)));
  await Promise.all(notifications.map((notification) => setDoc(doc(collection(db, "notifications"), notification.id), notification)));
}

seed()
  .then(() => {
    console.log("Seed completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
