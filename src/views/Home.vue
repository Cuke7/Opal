<template>
    <div class="h-full bg-base-100 flex justify-start items-center flex-col px-8 font-mono overflow-y-auto text-neutral-content">
        <div class="w-full lg:w-1/2">
            <div class="flex items-center lg:justify-start justify-around my-8 lg:space-x-12">
                <img src="../assets/opal.png" alt="" class="h-24" />
                <div class="text-primary text-7xl my-8">Opal</div>
            </div>
            <div class="font-mono text-lg bg-neutral rounded-lg p-4 pb-2 sm:ml-2 w-fit">
                <div class="mx-2">A <span class="text-primary">markdown</span> based, <span class="text-secondary">note taking</span> web application.</div>
                <router-link to="/tutorial" class="flex items-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg my-2 p-2">
                    <InformationCircleIcon class="h-6 w-6 text-primary mr-4" />
                    Tutorial
                </router-link>
                <button class="flex items-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg p-2" v-if="!user" @click="store.login">
                    <ArrowLeftOnRectangleIcon class="h-6 w-6 text-primary mr-4" />
                    Log in
                </button>
                <button class="flex items-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg p-2" v-if="user" @click="store.logout">
                    <ArrowRightOnRectangleIcon class="h-6 w-6 text-primary mr-4" />
                    Log out
                </button>
            </div>

            <div v-if="notesDrawer" class="w-full flex flex-wrap mt-8 justify-center lg:justify-start items-center">
                <router-link :to="`${key}`" v-for="key in Object.keys(notesDrawer)" :key="key" class="border-primary border-2 flex items-center hover:border-secondary rounded-lg p-2 m-2">
                    <ClipboardIcon class="h-6 w-6 text-secondary mr-2" />
                    {{ notesDrawer[key].title }}
                </router-link>
                <button v-if="user" class="flex items-center border-primary border-2 hover:border-secondary rounded-lg p-2 m-2" @click="createNote">
                    <PlusIcon class="h-6 w-6 text-secondary mr-4" />
                    Add a new note
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowLeftOnRectangleIcon, InformationCircleIcon, ClipboardIcon, ArrowRightOnRectangleIcon, PlusIcon } from "@heroicons/vue/24/outline";
import { user, store, notesDrawer } from "../store";
import { useRouter } from "vue-router";
const router = useRouter();

const createNote = () => {
    store.createNewNote().then(() => {
        router.push(store.tempKey);
    });
};
</script>
