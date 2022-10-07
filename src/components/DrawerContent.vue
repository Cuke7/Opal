<template>
    <ul class="p-4 overflow-y-auto w-64 bg-gray-800 text-white text-lg font-mono">
        <!-- <div class="font-mono font-bold text-4xl flex justify-center">Opal</div> -->
        <img src="/opal.png" alt="Opal stone" />
        <!-- <button v-if="!store.user" class="ml-2 btn bg-opacity-20 bg-pink-400 hover:bg-blue-800 hover:bg-opacity-50" @click="store.login">Sign in</button>
        <div class="bg-black bg-opacity-20 rounded-lg" v-else>
            <div class="flex items-center h-12">
                <img :src="store.user.photoURL" alt="" class="w-12 h-12 rounded-l-lg" />
                <div class="font-mono font-bold text-stone-200 mx-auto">
                    {{ store.user.displayName }}
                </div>
            </div>
        </div>

        <button v-if="store.user" @click="store.logout" class="mt-4 font-bold h-12 bg-pink-400 bg-opacity-20 hover:bg-opacity-50 rounded-lg w-full flex items-center justify-center hover:bg-blue-800">Log Out</button> -->

        <button class="flex w-full items-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg my-2 p-2" @click="setDemo">
            <InformationCircleIcon class="h-6 w-6 text-blue-400 mr-4" />
            Tutorial
        </button>

        <div class="text-lg ml-3">My notes</div>

        <button @click="store.loadNote(key)" v-for="key in Object.keys(notes)" :key="key" class="flex w-full items-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg my-2 p-2">
            <ClipboardIcon class="h-6 w-6 text-pink-400 mr-4" />
            {{ notes[key].title }}
        </button>

        <button @click="store.createNewNote" class="btn btn-ghost w-full flex items-center justify-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg my-2 p-2">
            <PlusIcon class="h-6 w-6 text-pink-400" />
        </button>
    </ul>
</template>

<script setup lang="ts">
import { ClipboardIcon, PlusIcon, InformationCircleIcon } from "@heroicons/vue/24/outline";
import { store, db, setDemo } from "../store";
import { ref as refdb, onValue } from "firebase/database";
import { ref } from "vue";

const notes = ref({});

//Set firebase listener
const notesListRef = refdb(db, "notesList/");
onValue(notesListRef, (snapshot) => {
    const data = snapshot.val();
    notes.value = data;
});
</script>
