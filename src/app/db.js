import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import config from "../config.js";

function initializeServices() {
  const firebaseApp = initializeApp(config.firebaseConfig);
  const firestore = getFirestore(firebaseApp);
  return { firebaseApp, firestore };
}

function connectToEmulators({ firestore }) {
    connectFirestoreEmulator(firestore, "localhost", 8080);
//   if (location.hostname === "localhost") {
//   }
}

export function getFirebase() {
  const services = initializeServices();
  connectToEmulators(services);
  return services;
}
