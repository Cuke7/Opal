<template>
    <div class="p-4 bg-black sm:border-b-gray-700 sm:border-b-2 rounded-3xl sm:rounded-none sm:rounded-t-2xl flex bg-opacity-30 flex-col space-y-2">
        <div class="justify-between flex items-center" v-if="props.fixedView">
            <label for="my-drawer-2" class="btn btn-ghost drawer-button lg:hidden"> <Bars3Icon class="w-6 h-6 text-pink-400" /></label>
            <label for="my-modal-6" class="btn modal-button btn-ghost hover:bg-blue-800 hover:bg-opacity-50" v-if="store.currentKey">
                <TrashIcon class="h-6 w-6 text-pink-400" />
            </label>
            <button class="btn btn-ghost hover:bg-blue-800 hover:bg-opacity-50" v-if="store.currentKey">
                <ShareIcon class="h-6 w-6 text-pink-400" />
            </button>
            <button class="btn btn-ghost hover:bg-blue-800 hover:bg-opacity-50" @click="store.saveNote()" v-if="store.currentKey">
                <DocumentArrowUpIcon class="h-6 w-6 text-pink-400" />
            </button>
        </div>
        <div class="flex justify-between items-center sm:hidden">
            <label v-if="!props.fixedView" for="my-drawer-2" class="btn btn-ghost drawer-button lg:hidden"> <Bars3Icon class="w-6 h-6 text-pink-400" /></label>

            <button @click="$emit('toggle')" class="btn btn-ghost lg:hidden">
                <PencilIcon v-if="!props.view" class="w-6 h-6 text-blue-400" />
                <EyeIcon v-else class="w-6 h-6 text-blue-400" />
            </button>
            <input v-if="props.view" type="text" class="w-1/2 bg-transparent border-pink-400 border-2 rounded-lg px-2 font-mono text-lg" v-model="note.title" />
            <div v-else class="font-mono text-lg">
                {{ note.title }}
            </div>
        </div>
        <div class="justify-between items-center hidden sm:flex">
            <input v-if="props.fixedView" type="text" class="w-1/2 bg-transparent border-pink-400 border-2 rounded-lg px-2 font-mono text-lg" v-model="note.title" />
            <div v-else class="font-mono text-lg rounded-lg mx-auto">
                {{ note.title }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { store, note } from "../store";
import { DocumentArrowUpIcon, TrashIcon, EyeIcon, Bars3Icon, PencilIcon, ShareIcon } from "@heroicons/vue/24/solid";
const props = defineProps(["view", "fixedView"]);
</script>
