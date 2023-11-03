// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore, collection, query, where, getDocs, orderBy, limit, count } from "firebase/firestore";

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


// Exercise 1
// A
const citiesRef = collection(db, 'cities');
const q1 = query(citiesRef, where("capital", "!=", true));
const snapshotA = await getDocs(q1);

const exerciseA = document.querySelector(".exercise-a")

snapshotA.forEach((doc) => {
    const li = document.createElement("li");
    li.innerText = doc.data().name;
    exerciseA.appendChild(li);
})
// B
const q2 = query(citiesRef, where("country", "in", ["USA", "China"]));
const snapshotB = await getDocs(q2);
const exerciseB = document.querySelector(".exercise-b")

snapshotB.forEach((doc) => {
    const li = document.createElement("li");
    li.innerText = doc.data().name;
    exerciseB.appendChild(li);
});

// C
const q3 = query(citiesRef, orderBy("population", "desc"), limit(1));
const snapshotC = await getDocs(q3);
const exerciseC = document.querySelector(".exercise-c")
snapshotC.forEach((doc) => {
    const li = document.createElement("li");
    li.innerText = `${doc.data().name} ${doc.data().population}`;
    exerciseC.appendChild(li);
});

// D
const q4 = query(citiesRef, where ("country", "!=", null));
const snapshotD = await getDocs(q4);
const exerciseD = document.querySelector(".exercise-d")

snapshotD.forEach((doc) => {
    console.log(doc.data().country);
});

const countryArray = [];

snapshotD.forEach((element, index) => {

    const currentCountry = element.data().country;

    const alreadyInCountryArray = countryArray.find((item) => item.name === currentCountry);

    if (alreadyInCountryArray) {
        alreadyInCountryArray.count++;
    } else {
        countryArray.push({ name:currentCountry, count: 1});
    }
});

const liD = document.querySelector(".exercise-d-1");
liD.innerText = countryArray.sort((a, b) => b.count - a.count)[0].name;

// E) Display a list of names of cities that are capitals with a population higher than 5.000.000

const q5a = query(citiesRef, where("capital", "==", true));
const q5b = query(q5a, where("population", ">", 5000000));
const snapshotE = await getDocs(q5b);
const exerciseE = document.querySelector(".exercise-e")

snapshotE.forEach((doc) => {
    const li = document.createElement("li");
    li.innerText = doc.data().name;
    exerciseE.appendChild(li);
});

// F) Write a basic input-field in the HTML page.
// When the user enters a city name in the field and clicks a button,
// the application will display an alert with "found" or "not found"
// if the user has inputted a city name in the database.

const inputF = document.querySelector(".exercise-f-input");
const buttonF = document.querySelector(".exercise-f-button");

buttonF.addEventListener("click", async () => {
    const q6 = query(citiesRef, where("name", "==", inputF.value));
    const snapshotF = await getDocs(q6);
    if (snapshotF.empty) {
        alert("not found");
    } else {
        alert("found");
    }
});

