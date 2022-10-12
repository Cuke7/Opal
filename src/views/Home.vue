<template>
    <div class="h-full bg-gray-900 flex justify-start items-center flex-col text-white px-8 font-mono overflow-y-auto sm:px-36">
        <div class="flex items-center w-full justify-evenly my-8 sm:justify-center sm:space-x-12">
            <img src="../assets/opal.png" alt="" class="h-24" />
            <div class="text-pink-400 text-7xl my-8">Opal</div>
        </div>
        <div class="font-mono text-lg bg-blue-400 bg-opacity-10 rounded-lg p-4 pb-2">
            <div>A markdown based, note taking web application.</div>
            <router-link to="/tutorial" class="flex w-full items-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg my-2 py-2">
                <InformationCircleIcon class="h-6 w-6 text-blue-400 mr-4" />
                Tutorial
            </router-link>
            <button class="flex w-full items-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg py-2" v-if="!user" @click="store.login">
                <ArrowLeftOnRectangleIcon class="h-6 w-6 text-blue-400 mr-4" />
                Log in
            </button>
            <button class="flex w-full items-center hover:bg-blue-800 hover:bg-opacity-50 rounded-l py-2" v-if="user" @click="store.logout">
                <ArrowRightOnRectangleIcon class="h-6 w-6 text-blue-400 mr-4" />
                Log out
            </button>
        </div>

        <div v-if="notesDrawer" class="w-full flex flex-wrap mt-12 space-x-2 sm:px-36 sm:space-x-8">
            <router-link :to="`${key}`" v-for="key in Object.keys(notesDrawer)" :key="key" class="border-blue-400 border-2 flex items-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg p-2">
                <ClipboardIcon class="h-6 w-6 text-pink-400 mr-2" />
                {{ notesDrawer[key].title }}
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowLeftOnRectangleIcon, InformationCircleIcon, ClipboardIcon, ArrowRightOnRectangleIcon } from "@heroicons/vue/24/outline";
import { user, store, notesDrawer } from "../store";
</script>
