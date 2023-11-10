
import { initializeApp } from "firebase/app";
import {getFirestore, collection, doc, setDoc, query, where, getDocs } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBD1aeMQYzhfghcViiy-e_bLV-PxriMr2s",
    authDomain: "fir-test1-6227f.firebaseapp.com",
    projectId: "fir-test1-6227f",
    storageBucket: "fir-test1-6227f.appspot.com",
    messagingSenderId: "1095274831066",
    appId: "1:1095274831066:web:82e2ef32c226d4eeeb19e3",
    measurementId: "G-EE6WGQCYMQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(initializeApp(firebaseConfig));

const notesRef = collection(db, "Notes");


const email = document.querySelector("#email");
const password = document.querySelector("#password");
const logInBtn = document.querySelector("#log-in");

const logInBlock = document.querySelector(".main-block");
const loggedInBlock = document.querySelector(".logged-in");

const getUserNotesFromDB = async () => {
    const user = auth.currentUser;
    const uid = user.uid;
    const q = query(notesRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((note) => {
        console.log(note.data());
        const noteTitle = note.data().title;
        const noteParagraph = note.data().paragraph;
        const noteAuthor = note.data().author;
        const noteId = note.id;
        const noteHTML = `
            <div class="note">
                <h2>${noteTitle}</h2>
                <p>${noteParagraph}</p>
                <h5>${noteAuthor}</h5>
                <button class="delete" data-id="${noteId}">Delete</button>
            </div>
        `;
        loggedInBlock.insertAdjacentHTML("beforeend", noteHTML);
    });
}

const  logIn = async () => {
    const emailValue = email.value;
    const passwordValue = password.value;
    await signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            logInBlock.classList.add("invisible");
            loggedInBlock.classList.remove("invisible");
            email.value = "";
            password.value = "";
            getUserNotesFromDB();
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            alert(errorMessage);
        });
};

logInBtn.addEventListener("click", logIn);

const createAccountBtn = document.querySelector("#create");

const createAccount = () => {
    const emailValue = email.value;
    const passwordValue = password.value;
    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            console.log(user.email);
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            alert(errorMessage);
        });
}

createAccountBtn.addEventListener("click", createAccount);


const logOutBtn = document.querySelector("#logout");
const addNotesBtn = document.querySelector("#add-note");
const noteTitle = document.querySelector("#note-title");
const noteText = document.querySelector("#note-paragraph");


const addNoteToDB = async () => {
    const noteTitleValue = noteTitle.value;
    const noteTextValue = noteText.value;
    const user = auth.currentUser;
    const uid = user.uid;
    await setDoc(doc(notesRef), {
        author: user.email,
        title: noteTitleValue,
        paragraph: noteTextValue,
        uid: uid
    })
        .then(() => {
            console.log("Document successfully written!");
            noteTitle.value = "";
            noteText.value = "";
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}



addNotesBtn.addEventListener("click", addNoteToDB);

logOutBtn.addEventListener("click", async () => {
    await auth.signOut().then(() => {
        logInBlock.classList.remove("invisible");
        loggedInBlock.classList.add("invisible");
    }).catch((error) => {
        console.log(error);
    });
});

