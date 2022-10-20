<template>
    <ul class="p-4 overflow-y-auto w-64 bg-neutral text-neutral-content text-lg font-mono">
        <!-- <div class="font-mono font-bold text-4xl flex justify-center my-4">Opal</div>
        <img src="../assets/opal.png" alt="Opal stone" class="mx-auto my-4" /> -->

        <button class="flex w-full items-center hover:bg-info hover:bg-opacity-50 rounded-lg my-2 p-2" v-if="!user" @click="store.login">
            <ArrowLeftOnRectangleIcon class="h-6 w-6 text-primary mr-4" />
            Log in
        </button>

        <div class="rounded-lg px-3 mt-4" v-else>
            <div class="flex items-center h-12">
                <img :src="user.photoURL" alt="" class="w-12 h-12 rounded-lg" />
                <div class="font-mono font-bold text-neutral-content ml-4">
                    {{ user.displayName }}
                </div>
            </div>
        </div>
        <button class="flex w-full items-center hover:bg-info hover:bg-opacity-50 rounded-lg my-2 p-2" v-if="user" @click="store.logout">
            <ArrowRightOnRectangleIcon class="h-6 w-6 text-primary mr-4" />
            Log out
        </button>

        <hr class="m-3 mt-2 border-t-2 border-accent" v-if="user" />
        <router-link to="/" class="flex w-full items-center hover:bg-info hover:bg-opacity-50 rounded-lg my-2 p-2" @click="drawer = false">
            <HomeIcon class="h-6 w-6 text-primary mr-4" />
            Home
        </router-link>
        <router-link to="/tutorial" class="flex w-full items-center hover:bg-info hover:bg-opacity-50 rounded-lg my-2 p-2" @click="drawer = false">
            <InformationCircleIcon class="h-6 w-6 text-primary mr-4" />
            Tutorial
        </router-link>

        <DarkModeSwitch />

        <div class="lg:flex w-full items-center rounded-lg mt-2 p-2 hidden">
            <input type="checkbox" class="toggle bg-secondary mySwitch border-2 border-primary mr-4" v-model="viewOnly" />
            <span v-if="viewOnly">View only</span>
            <span v-else>Edit + View</span>
        </div>

        <!-- <div class="lg:flex w-full items-center hover:bg-info hover:bg-opacity-50 rounded-lg my-2 p-2 hidden">
            <input type="checkbox" class="toggle bg-secondary mySwitch border-2 border-primary mr-4" v-model="lightMode" />
            <span v-if="lightMode">Light theme</span>
            <span v-else>Dark theme</span>
        </div> -->

        <hr class="m-3 mt-2 border-accent border-t-2" v-if="user" />
        <div v-if="user" class="text-xl ml-3 font-bold my-3">My notes</div>

        <div v-if="notesDrawer">
            <router-link :to="`${note.key}`" v-for="note in notesDrawer" class="flex w-full items-center hover:bg-info hover:bg-opacity-50 rounded-lg my-2 p-2">
                <ClipboardIcon class="h-6 w-6 text-secondary mr-4" />
                {{ note.title }}
            </router-link>
        </div>

        <button v-if="user" @click="createNewNote" class="btn btn-ghost w-full hover:bg-info hover:bg-opacity-50 rounded-lg border-primary border-2">
            <PlusIcon class="h-6 w-6 text-primary" />
        </button>
    </ul>
</template>

<script setup lang="ts">
import { ClipboardIcon, PlusIcon, InformationCircleIcon, ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon, HomeIcon } from "@heroicons/vue/24/outline";
import { store, notesDrawer, user, drawer, viewOnly, createNote } from "../store";
import { useRouter } from "vue-router";
import DarkModeSwitch from "./DarkModeSwitch.vue";
const router = useRouter();

const createNewNote = () => {
    createNote().then((key) => {
        router.push(String(key));
    });
};
</script>
