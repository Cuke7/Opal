import { reactive, ref } from 'vue'
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase, ref as refdb, push, child, update, onValue, get } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyAlipydLd_XjBNk9ikNG3tfc_q4NW0j8FQ",
    authDomain: "opal-a0759.firebaseapp.com",
    projectId: "opal-a0759",
    storageBucket: "opal-a0759.appspot.com",
    messagingSenderId: "583756743308",
    appId: "1:583756743308:web:18d68dd392c0bb31abf1a9",
    databaseURL: "https://opal-a0759-default-rtdb.europe-west1.firebasedatabase.app/",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "fr";
const provider = new GoogleAuthProvider();
export const db = getDatabase(app);

export const note = ref({
    text: "",
    title: "",
    key: <null | string>null
})

export const drawer = ref(false)
export const notesDrawer = ref<any>({});
export const user = ref<any>(null)


onAuthStateChanged(auth, (user2: any) => {
    if (user2) {
        console.log("onAuthStateChanged", user2);
        user.value = user2;
        store.toast("Logged in!", 2000);
        //Set firebase listener
        const notesListRef = refdb(db, `notesList/${user.value.uid}/`);
        onValue(notesListRef, (snapshot) => {
            const data = snapshot.val();
            notesDrawer.value = data;
        });
    } else {
        user.value = null;
        console.log("Logged out!", user2);
        store.toast("Logged out!", 2000);
    }
});

export const store = reactive({
    login: () => {
        signInWithPopup(auth, provider)
            .then((result: any) => {
                user.value = result.user;
            })
            .catch((error: any) => console.error(error));
    },
    logout: () => {
        signOut(auth)
            .then(() => {
                console.log("Logged out");
                notesDrawer.value = {}
            })
            .catch((error: any) => console.error(error));
    },
    toastSettings: {
        show: false,
        text: "",
    },
    createNewNote: () => {
        const newNoteKey = <string>push(child(refdb(db), "/")).key;
        const newNote = {
            text: "# Hi mom",
            title: "My new note",
            key: newNoteKey
        }
        store.tempKey = newNoteKey
        const updates: any = {};
        updates[`/notesContent/${user.value.uid}/${newNoteKey}`] = { text: newNote.text, title: newNote.title };
        updates[`/notesList/${user.value.uid}/${newNoteKey}`] = { title: newNote.title };
        return update(refdb(db), updates);
    },
    loadNote: (uid: string, key: string) => {
        const dbRef = refdb(db);
        get(child(dbRef, `notesContent/${uid}/${key}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const retrievedNote = snapshot.val();
                    note.value = retrievedNote;
                    note.value.key = key;
                    drawer.value = false;
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    },
    saveNote: () => {
        if (!note.value.key) return
        const updates: any = {};
        updates[`/notesContent/${user.value.uid}/${note.value.key}`] = { text: note.value.text, title: note.value.title };
        updates[`/notesList/${user.value.uid}/${note.value.key}`] = { title: note.value.title };
        update(refdb(db), updates)
            .then(() => {
                store.toast("Note saved", 1000);
            })
            .catch(() => {
                store.toast("Error, can't save note", 5000);
            });
    },
    toast: (text: string, duration: number) => {
        store.toastSettings.text = text;
        store.toastSettings.show = true;
        setTimeout(() => {
            store.toastSettings.show = false;
        }, duration);
    },
    deleteNote: () => {
        const updates: any = {};
        updates[`/notesContent/${user.value.uid}/${note.value.key}`] = null;
        updates[`/notesList/${user.value.uid}/${note.value.key}`] = null;
        return update(refdb(db), updates)
    },
    tempKey: ""
})
