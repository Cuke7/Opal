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
                <div class="flex h-full bg-gray-900 text-white p-4">
                    <div class="h-full w-1/2 flex flex-col">
                        <div class="bg-black border-b-gray-700 border-b-2 rounded-t-2xl p-5 justify-between items-center flex bg-opacity-30">
                            <input type="text" class="bg-transparent border-pink-400 border-2 rounded-lg p-1 px-2 font-mono text-lg" v-model="noteTitle" />
                            <div class="flex space-x-4">
                                <button class="btn btn-ghost hover:bg-blue-800 hover:bg-opacity-50">
                                    <DocumentArrowUpIcon class="h-6 w-6 text-pink-400" />
                                </button>
                                <button class="btn btn-ghost hover:bg-blue-800 hover:bg-opacity-50">
                                    <ShareIcon class="h-6 w-6 text-pink-400" />
                                </button>
                                <button class="btn btn-ghost hover:bg-blue-800 hover:bg-opacity-50">
                                    <TrashIcon class="h-6 w-6 text-pink-400" />
                                </button>
                            </div>
                        </div>
                        <textarea v-model="text" class="flex-1 bg-black w-full overflow-y-auto p-8 pl-16 mr-2 lg:text-lg bg-opacity-20"> </textarea>
                    </div>
                    <div class="h-full bg-black w-1/2 overflow-y-auto prose max-w-none p-8 ml-2 pl-16 lg:prose-lg !prose-invert rounded-t-2xl bg-opacity-20" v-html="html" />
                </div>
            </div>
        </div>
        <div class="drawer-side">
            <label for="my-drawer-2" class="drawer-overlay"></label>

            <ul class="p-4 overflow-y-auto w-64 bg-gray-800 text-white text-lg font-mono">
                <!-- <div class="font-mono font-bold text-4xl flex justify-center">Opal</div> -->
                <img src="./assets/stone.png" class="p-5" alt="" />
                <div class="flex justify-center" v-if="!user">
                    <button class="btn mb-6 bg-pink-400 hover:bg-blue-800 hover:bg-opacity-50" @click="login">Sign in</button>
                </div>
                <div class="flex w-full m-4" v-else>
                    <img :src="user.photoURL" alt="" class="w-10 h-10 rounded-lg" />
                    <div class="font-mono font-bold text-stone-200 ml-4">
                        {{ user.displayName }}
                    </div>
                </div>

                <div class="text-lg ml-3">My notes</div>
                <li class="hover:bg-blue-800 hover:bg-opacity-50 rounded-lg my-2 p-2">
                    <button class="flex w-full items-center" @click="text = demo">
                        <ClipboardIcon class="h-6 w-6 text-pink-400 mr-4" />
                        How to use
                    </button>
                </li>
                <li class="hover:bg-blue-800 hover:bg-opacity-50 rounded-lg my-2 p-2">
                    <button class="w-full flex items-center justify-center">
                        <PlusIcon class="h-6 w-6 text-pink-400 mr-4" />
                    </button>
                </li>
                <button @click="logout" class="bg-pink-400 bg-opacity-20 hover:bg-opacity-50 rounded-lg my-2 p-2 btn w-full flex items-center justify-center hover:bg-blue-800 mt-16">Log Out</button>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { marked } from "marked";
import { ClipboardIcon, DocumentArrowUpIcon, TrashIcon, ShareIcon, PlusIcon } from "@heroicons/vue/24/outline";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAlipydLd_XjBNk9ikNG3tfc_q4NW0j8FQ",
    authDomain: "opal-a0759.firebaseapp.com",
    projectId: "opal-a0759",
    storageBucket: "opal-a0759.appspot.com",
    messagingSenderId: "583756743308",
    appId: "1:583756743308:web:18d68dd392c0bb31abf1a9",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "fr";
const provider = new GoogleAuthProvider();

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

const noteTitle = ref("How to use");

const html = computed(() => {
    if (text.value) {
        let md = text.value;
        console.log(md.split("/"));
        return marked.parse(md);
    }
    return "";
});
const text = ref("");
const demo = ref(`# Hello first title
## Hello second title
### Hello third title
...

***

I can be *italic*, **bold** and even ***both***.
> I'm a quote.
***

And there's a list:

- one,
- two,
  - use 2 spaces for
  - a nested list,
- tree.
`);
text.value = demo.value;

onAuthStateChanged(auth, (user2: any) => {
    if (user2) {
        console.log("onAuthStateChanged", user2);
        user.value = user2;
        // ...
    } else {
        user.value = null;
        console.log("Logged out!", user2);
    }
});
</script>
