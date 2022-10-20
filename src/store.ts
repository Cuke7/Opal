import { reactive, ref } from 'vue'
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, doc, onSnapshot, setDoc, query, getDoc, deleteDoc } from "firebase/firestore";

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
export const db = getFirestore(app);

export const note = ref({
    text: "",
    title: "",
    key: <null | string>null
})

export const drawer = ref(false)
export const notesDrawer = ref<any>({});
export const user = ref<any>(null)
export const viewOnly = ref(false)
export const lightMode = ref(false)


onAuthStateChanged(auth, async (user2) => {
    if (user2) {
        user.value = user2
        console.log("onAuthStateChanged", "Signed in")
        const q = query(collection(db, user.value.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            notesDrawer.value = []
            querySnapshot.forEach((doc) => {
                notesDrawer.value.push({ ...doc.data(), key: doc.id });
            })
        });
        store.toast("Logged in!", 2000);
    } else {
        user.value = null
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
        text: "Logged in",
    },

    toast: (text: string, duration: number) => {
        store.toastSettings.text = text;
        store.toastSettings.show = true;
        setTimeout(() => {
            store.toastSettings.show = false;
        }, duration);
    },
})


export const createNote = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const docRef = await addDoc(collection(db, user.value.uid), { title: "My new note", text: "# Hi mom" });
            console.log("Document written with ID: ", docRef.id);
            store.toast("New note created", 2000);
            resolve(docRef.id)
        } catch (e) {
            // console.error("Error adding document: ", e);
            store.toast("Failed to create a new note", 2000);
            reject(null)
        }
    })
}

export const saveNote = async () => {
    if (note.value.key) {
        try {
            await setDoc(doc(db, user.value.uid, note.value.key), {
                title: note.value.title,
                text: note.value.text
            });
            store.toast("Note saved", 2000);
        } catch (e) {
            console.error("Error adding document: ", e);
            store.toast("Failed to save note", 2000);
        }
    }
}

export const loadNote = async (key: string) => {
    const docRef = doc(db, user.value.uid, key);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        note.value = <any>docSnap.data()
        note.value.key = key
        drawer.value = false;
    } else {
        store.toast("Failed to load note", 2000);
    }
}

export const deleteNote = async () => {
    await deleteDoc(doc(db, user.value.uid, String(note.value.key)));
}