<template>
    <div class="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
            <div class="h-screen">
                <!-- <div class="h-1/6 bg-gray-900 flex items-center justify-end">
                    <div class="flex h-full items-center">
                        <div class="text-5xl font-mono text-white mr-8">Opal</div>
                        <img src="./assets/stone.webp" class="w-auto h-full" alt="" />
                    </div>
                </div> -->
                <div class="flex h-full bg-gray-900 text-white p-8">
                    <div class="h-full w-1/2 flex flex-col">
                        <div class="bg-black border-b-gray-700 border-b-2 rounded-t-2xl p-4 justify-between items-center flex bg-opacity-30">
                            <input type="text" class="bg-transparent border-pink-400 border-2 rounded-lg p-1 px-2 font-mono text-lg" v-model="note.title" />
                            <div class="flex space-x-4">
                                <button class="btn btn-ghost hover:bg-blue-800 hover:bg-opacity-50" v-if="currentKey">
                                    <TrashIcon class="h-6 w-6 text-pink-400" />
                                </button>
                                <button class="btn btn-ghost hover:bg-blue-800 hover:bg-opacity-50" @click="saveNote()" v-if="currentKey">
                                    <DocumentArrowUpIcon class="h-6 w-6 text-pink-400" />
                                </button>
                                <!-- <button class="btn btn-ghost hover:bg-blue-800 hover:bg-opacity-50">
                                    <ShareIcon class="h-6 w-6 text-pink-400" />
                                </button> -->
                            </div>
                        </div>
                        <textarea v-model="note.text" class="flex-1 bg-black w-full overflow-y-auto p-8 mr-8 lg:text-lg bg-opacity-20"> </textarea>
                    </div>
                    <div class="h-full bg-black w-1/2 overflow-y-auto prose max-w-none p-8 ml-8 lg:prose-lg !prose-invert rounded-t-2xl bg-opacity-20" v-html="html" />
                </div>
            </div>
        </div>
        <div class="drawer-side">
            <label for="my-drawer-2" class="drawer-overlay"></label>

            <ul class="p-4 overflow-y-auto w-64 bg-gray-800 text-white text-lg font-mono">
                <!-- <div class="font-mono font-bold text-4xl flex justify-center">Opal</div> -->
                <img src="../public/opal.png" alt="Opal stone" />
                <button v-if="!user" class="ml-2 btn bg-opacity-20 bg-pink-400 hover:bg-blue-800 hover:bg-opacity-50" @click="login">Sign in</button>
                <div class="bg-black bg-opacity-20 rounded-lg" v-else>
                    <div class="flex items-center h-12">
                        <img :src="user.photoURL" alt="" class="w-12 h-12 rounded-l-lg" />
                        <div class="font-mono font-bold text-stone-200 mx-auto">
                            {{ user.displayName }}
                        </div>
                    </div>
                </div>

                <button v-if="user" @click="logout" class="mt-4 font-bold h-12 bg-pink-400 bg-opacity-20 hover:bg-opacity-50 rounded-lg w-full flex items-center justify-center hover:bg-blue-800">Log Out</button>

                <button class="flex w-full items-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg my-2 p-2" @click="setDemo">
                    <InformationCircleIcon class="h-6 w-6 text-blue-400 mr-4" />
                    Tutorial
                </button>

                <div class="text-lg ml-3">My notes</div>

                <button @click="loadNote(key)" v-for="key in Object.keys(notes)" :key="key" class="flex w-full items-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg my-2 p-2">
                    <ClipboardIcon class="h-6 w-6 text-pink-400 mr-4" />
                    {{ notes[key].title }}
                </button>

                <button @click="createNewNote" class="btn btn-ghost w-full flex items-center justify-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg my-2 p-2">
                    <PlusIcon class="h-6 w-6 text-pink-400" />
                </button>
            </ul>
        </div>
    </div>
    <Toast v-if="toastSettings.show" :text="toastSettings.text" />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { marked } from "marked";
import { ClipboardIcon, DocumentArrowUpIcon, TrashIcon, ShareIcon, PlusIcon, InformationCircleIcon } from "@heroicons/vue/24/outline";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref as refdb, push, child, update, onValue, get } from "firebase/database";
import Toast from "./components/Toast.vue";

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
const db = getDatabase(app);

const user = ref<any>(null);

const login = () => {
    signInWithPopup(auth, provider)
        .then((result: any) => {
            user.value = result.user;
            console.log("Logged in", user.value);
        })
        .catch((error: any) => console.error(error));
};

const logout = () => {
    signOut(auth)
        .then(() => {
            console.log("Logged out");
        })
        .catch((error: any) => console.error(error));
};

interface Note {
    title: string;
    text: string;
}

const toastSettings = ref({
    show: false,
    text: "",
});

const note = ref<Note>({
    text: "",
    title: "Tutorial",
});

const html = computed(() => {
    if (note.value.text) {
        let md = note.value.text;
        return marked.parse(md);
    }
    return "";
});
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
const currentKey = ref<string | null>("");

const setDemo = () => {
    note.value.text = demo;
    note.value.title = "Tutorial";
    currentKey.value = null;
};
setDemo();

const createNewNote = () => {
    const newNoteKey = push(child(refdb(db), "notes")).key;
    note.value.text = "# Hi mom";
    note.value.title = "My new note";
    currentKey.value = newNoteKey;
    const updates: any = {};
    updates["/notesContent/" + newNoteKey] = note.value;
    updates["/notesList/" + newNoteKey] = { title: note.value.title };
    return update(refdb(db), updates);
};

onAuthStateChanged(auth, (user2: any) => {
    if (user2) {
        console.log("onAuthStateChanged", user2);
        user.value = user2;
        toast("Logged in!", 2000);
    } else {
        user.value = null;
        console.log("Logged out!", user2);
        toast("Logged out!", 2000);
    }
});

const notes = ref({});

//Set firebase listener
const notesListRef = refdb(db, "notesList/");
onValue(notesListRef, (snapshot) => {
    const data = snapshot.val();
    notes.value = data;
});

const loadNote = (key: string) => {
    saveNote();
    const dbRef = refdb(db);
    get(child(dbRef, `notesContent/${key}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const retrievedNote = snapshot.val();
                note.value = retrievedNote;
                currentKey.value = key;
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
};

const saveNote = () => {
    const updates: any = {};
    updates["/notesContent/" + currentKey.value] = note.value;
    updates["/notesList/" + currentKey.value] = { title: note.value.title };
    update(refdb(db), updates)
        .then(() => {
            toast("Note saved", 1000);
        })
        .catch(() => {
            toast("Error, can't save note", 5000);
        });
};

const toast = (text: string, duration: number) => {
    toastSettings.value.text = text;
    toastSettings.value.show = true;
    setTimeout(() => {
        toastSettings.value.show = false;
    }, duration);
};
</script>
