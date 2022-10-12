<template>
    <div class="h-full bg-gray-900 flex justify-start items-center flex-col text-white px-8 font-mono overflow-y-auto">
        <div class="w-full lg:w-2/6">
            <div class="flex items-center w-full lg:justify-start justify-around my-8 lg:space-x-12">
                <img src="../assets/opal.png" alt="" class="h-24" />
                <div class="text-pink-400 text-7xl my-8">Opal</div>
            </div>
            <div class="font-mono text-lg bg-blue-400 bg-opacity-10 rounded-lg p-4 pb-2 ml-2">
                <div class="mx-2">A <span class="text-blue-400 font-bold">markdown</span> based, <span class="text-pink-400 font-bold">note taking</span> web application.</div>
                <router-link to="/tutorial" class="flex w-full items-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg my-2 p-2">
                    <InformationCircleIcon class="h-6 w-6 text-blue-400 mr-4" />
                    Tutorial
                </router-link>
                <button class="flex items-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg p-2" v-if="!user" @click="store.login">
                    <ArrowLeftOnRectangleIcon class="h-6 w-6 text-blue-400 mr-4" />
                    Log in
                </button>
                <button class="flex w-full items-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg p-2" v-if="user" @click="store.logout">
                    <ArrowRightOnRectangleIcon class="h-6 w-6 text-blue-400 mr-4" />
                    Log out
                </button>
            </div>
            <div v-if="notesDrawer" class="w-full flex flex-wrap mt-8 justify-start lg:justify-start items-center">
                <router-link :to="`${key}`" v-for="key in Object.keys(notesDrawer)" :key="key" class="border-blue-400 border-2 flex items-center hover:border-pink-400 rounded-lg p-2 m-2">
                    <ClipboardIcon class="h-6 w-6 text-pink-400 mr-2" />
                    {{ notesDrawer[key].title }}
                </router-link>
            </div>
            <button v-if="user" class="flex items-center border-blue-400 border-2 hover:border-pink-400 rounded-lg p-2 m-2">
                <PlusIcon class="h-6 w-6 text-pink-400 mr-4" />
                Add a new note
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowLeftOnRectangleIcon, InformationCircleIcon, ClipboardIcon, ArrowRightOnRectangleIcon, PlusIcon } from "@heroicons/vue/24/outline";
import { user, store, notesDrawer } from "../store";
</script>
