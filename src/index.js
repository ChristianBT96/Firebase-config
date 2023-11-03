// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBD1aeMQYzhfghcViiy-e_bLV-PxriMr2s",
    authDomain: "fir-test1-6227f.firebaseapp.com",
    projectId: "fir-test1-6227f",
    storageBucket: "fir-test1-6227f.appspot.com",
    messagingSenderId: "1095274831066",
    appId: "1:1095274831066:web:82e2ef32c226d4eeeb19e3",
    measurementId: "G-EE6WGQCYMQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetching a single document
import { doc, getDoc } from "firebase/firestore";

const docRef = doc(db, "cities", "SF");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
} else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
}

// Fetching multiple documents
import { collection, getDocs } from "firebase/firestore";

const querySnapshot = await getDocs(collection(db, "cities"));
querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
});

const submitButton = document.querySelector("#submit");


