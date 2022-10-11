<template>
    <ul class="p-4 overflow-y-auto w-64 bg-gray-800 text-white text-lg font-mono">
        <div class="font-mono font-bold text-4xl flex justify-center my-4">Opal</div>
        <img src="../assets/opal.png" alt="Opal stone" class="mx-auto my-4" />

        <button class="flex w-full items-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg my-2 p-2" v-if="!store.user" @click="store.login">
            <ArrowLeftOnRectangleIcon class="h-6 w-6 text-blue-400 mr-4" />
            Log in
        </button>

        <div class="rounded-lg px-3" v-else>
            <div class="flex items-center h-12">
                <img :src="store.user.photoURL" alt="" class="w-12 h-12 rounded-lg" />
                <div class="font-mono font-bold text-stone-200 mx-auto">
                    {{ store.user.displayName }}
                </div>
            </div>
        </div>

        <button class="flex w-full items-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg my-2 p-2" v-if="store.user" @click="store.logout">
            <ArrowRightOnRectangleIcon class="h-6 w-6 text-blue-400 mr-4" />
            Log out
        </button>

        <button class="flex w-full items-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg my-2 p-2" @click="setDemo">
            <InformationCircleIcon class="h-6 w-6 text-blue-400 mr-4" />
            Tutorial
        </button>
        <hr class="m-3 mt-2 border-blue-400" v-if="store.user" />
        <div v-if="store.user" class="text-lg ml-3 font-bold">My notes</div>

        <div v-if="notes">
            <button @click="store.loadNote(key)" v-for="key in Object.keys(notes)" :key="key" class="flex w-full items-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg my-2 p-2">
                <ClipboardIcon class="h-6 w-6 text-pink-400 mr-4" />
                {{ notes[key].title }}
            </button>
        </div>

        <button v-if="store.user" @click="store.createNewNote" class="btn btn-ghost w-full flex items-center justify-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg my-2 p-2">
            <PlusIcon class="h-6 w-6 text-pink-400" />
        </button>
    </ul>
</template>

<script setup lang="ts">
import { ClipboardIcon, PlusIcon, InformationCircleIcon, ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon } from "@heroicons/vue/24/outline";
import { store, notes, setDemo } from "../store";
</script>
