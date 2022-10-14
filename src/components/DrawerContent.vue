<template>
    <ul class="p-4 overflow-y-auto w-64 bg-gray-800 text-white text-lg font-mono">
        <!-- <div class="font-mono font-bold text-4xl flex justify-center my-4">Opal</div>
        <img src="../assets/opal.png" alt="Opal stone" class="mx-auto my-4" /> -->

        <button class="flex w-full items-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg my-2 p-2" v-if="!user" @click="store.login">
            <ArrowLeftOnRectangleIcon class="h-6 w-6 text-blue-400 mr-4" />
            Log in
        </button>

        <div class="rounded-lg px-3" v-else>
            <div class="flex items-center h-12">
                <img :src="user.photoURL" alt="" class="w-12 h-12 rounded-lg" />
                <div class="font-mono font-bold text-stone-200 ml-4">
                    {{ user.displayName }}
                </div>
            </div>
        </div>
        <hr class="m-3 mt-5 border-blue-400" v-if="user" />
        <router-link to="/" class="flex w-full items-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg my-2 p-2" @click="drawer = false">
            <HomeIcon class="h-6 w-6 text-blue-400 mr-4" />
            Home
        </router-link>
        <router-link to="/tutorial" class="flex w-full items-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg my-2 p-2" @click="drawer = false">
            <InformationCircleIcon class="h-6 w-6 text-blue-400 mr-4" />
            Tutorial
        </router-link>
        <button class="flex w-full items-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg my-2 p-2" v-if="user" @click="store.logout">
            <ArrowRightOnRectangleIcon class="h-6 w-6 text-blue-400 mr-4" />
            Log out
        </button>
        <div class="sm:flex w-full items-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg my-2 p-2 hidden">
            <input type="checkbox" class="toggle bg-pink-400 mySwitch border-2 border-blue-400 mr-4" v-model="editMode" />
            <span v-if="editMode">Edit mode</span>
            <span v-else="editMode">View mode</span>
        </div>

        <hr class="m-3 mt-2 border-blue-400" v-if="user" />
        <div v-if="user" class="text-lg ml-3 font-bold">My notes</div>

        <div v-if="notesDrawer">
            <router-link :to="`${key}`" v-for="key in Object.keys(notesDrawer)" :key="key" class="flex w-full items-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg my-2 p-2">
                <ClipboardIcon class="h-6 w-6 text-pink-400 mr-4" />
                {{ notesDrawer[key].title }}
            </router-link>
        </div>

        <button v-if="user" @click="createNote" class="btn btn-ghost w-full flex items-center justify-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg">
            <PlusIcon class="h-6 w-6 text-pink-400" />
        </button>
    </ul>
</template>

<script setup lang="ts">
import { ClipboardIcon, PlusIcon, InformationCircleIcon, ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon, HomeIcon } from "@heroicons/vue/24/outline";
import { store, notesDrawer, user, drawer, editMode } from "../store";
import { useRouter } from "vue-router";
const router = useRouter();

const createNote = () => {
    store.createNewNote().then(() => {
        router.push(store.tempKey);
    });
};
</script>
