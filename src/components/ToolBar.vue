<template>
    <div class="p-2 bg-black rounded-3xl flex bg-opacity-30 justify-between">
        <div class="flex items-center">
            <label for="my-drawer-2" class="btn btn-ghost drawer-button lg:hidden"> <Bars3Icon class="w-6 h-6 text-pink-400" /></label>
            <button @click="$emit('toggle')" class="btn btn-ghost lg:hidden">
                <PencilIcon v-if="!props.view" class="w-6 h-6 text-blue-400" />
                <EyeIcon v-else class="w-6 h-6 text-blue-400" />
            </button>
            <input v-if="props.view" type="text" class="sm:hidden w-full mx-2 bg-transparent border-pink-400 border-2 rounded-lg px-2 font-mono text-lg" v-model="note.title" />
            <div v-else class="font-mono text-lg px-4 sm:hidden">
                {{ note.title }}
            </div>
            <input type="text" class="hidden sm:flex w-full m-2 bg-transparent border-pink-400 border-2 rounded-lg px-2 font-mono text-lg" v-model="note.title" v-if="store.currentKey" />
            <div v-else class="hidden sm:flex font-mono text-lg px-4 m-2">
                {{ note.title }}
            </div>
        </div>
        <div class="dropdown dropdown-hover dropdown-end p-2" v-if="store.currentKey">
            <div class="flex items-center h-full">
                <EllipsisVerticalIcon tabindex="0" class="w-7 h-7 text-pink-400" />
            </div>
            <ul tabindex="0" class="dropdown-content shadow rounded-box w-48 bg-black text-white space-y-3 flex flex-col py-4 px-4">
                <button class="flex justify-start items-center hover:bg-blue-800 hover:bg-opacity-50 p-2 rounded-lg" @click="store.saveNote()">
                    <DocumentArrowUpIcon class="h-6 w-6 text-pink-400" />
                    <div class="ml-4">Save note</div>
                </button>
                <!-- <button class="flex justify-start items-center hover:bg-blue-800 hover:bg-opacity-50 p-2 rounded-lg">
                    <ShareIcon class="h-6 w-6 text-pink-400" />
                    <div class="ml-4">Share note</div>
                </button> -->
                <label for="my-modal-6" class="modal-button flex justify-start items-center hover:bg-blue-800 hover:bg-opacity-50 p-2 rounded-lg cursor-pointer">
                    <TrashIcon class="h-6 w-6 text-pink-400" />
                    <div class="ml-4">Delete note</div>
                </label>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { store, note } from "../store";
import { DocumentArrowUpIcon, TrashIcon, EyeIcon, Bars3Icon, PencilIcon, ShareIcon, EllipsisVerticalIcon } from "@heroicons/vue/24/outline";
const props = defineProps(["view", "isRender"]);
</script>
