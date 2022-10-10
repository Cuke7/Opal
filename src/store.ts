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
    title: "Tutorial",
})

export const drawer = ref(false)


onAuthStateChanged(auth, (user2: any) => {
    if (user2) {
        console.log("onAuthStateChanged", user2);
        store.user = user2;
        store.toast("Logged in!", 2000);
    } else {
        store.user = null;
        console.log("Logged out!", user2);
        store.toast("Logged out!", 2000);
    }
});

export const store = reactive({
    user: <any>null,
    login: () => {
        signInWithPopup(auth, provider)
            .then((result: any) => {
                store.user = result.user;
            })
            .catch((error: any) => console.error(error));
    },
    logout: () => {
        signOut(auth)
            .then(() => {
                console.log("Logged out");
            })
            .catch((error: any) => console.error(error));
    },
    toastSettings: {
        show: false,
        text: "",
    },
    currentKey: <null | string>"",
    createNewNote: () => {
        const newNoteKey = push(child(refdb(db), "notes")).key;
        note.value.text = "# Hi mom";
        note.value.title = "My new note";
        store.currentKey = newNoteKey;
        const updates: any = {};
        updates["/notesContent/" + newNoteKey] = note.value;
        updates["/notesList/" + store.currentKey] = { title: note.value.title };
        return update(refdb(db), updates);
    },
    loadNote: (key: string) => {
        // if (store.currentKey) store.saveNote();
        const dbRef = refdb(db);
        get(child(dbRef, `notesContent/${key}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const retrievedNote = snapshot.val();
                    note.value = retrievedNote;
                    store.currentKey = key;
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
        if (!store.currentKey) return
        const updates: any = {};
        updates["/notesContent/" + store.currentKey] = note.value;
        updates["/notesList/" + store.currentKey] = { title: note.value.title };
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
        updates["/notesContent/" + store.currentKey] = null;
        updates["/notesList/" + store.currentKey] = null;
        update(refdb(db), updates)
            .then(() => {
                store.toast("Note deleted", 1000);
                setDemo()
            })
            .catch(() => {
                store.toast("Error, can't delete note", 5000);
            });
    }
})


const demo = `# Hello first title
## Hello second title
### Hello third title
...

***

I can be *italic*, **bold** and even ***both***.
> I'm a quote.

And there's a list:

- one,
- ~~two~~,
  - use 2 spaces for
  - a nested list,
- tree.
`;

export const setDemo = () => {
    note.value.text = demo;
    note.value.title = "Tutorial";
    store.currentKey = null;
    drawer.value = false;
};

setDemo();
