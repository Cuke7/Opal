<template>
    <div class="p-2 bg-blue-400 bg-opacity-10 rounded-3xl flex justify-between">
        <div class="flex items-center">
            <label for="my-drawer-2" class="btn btn-ghost drawer-button lg:hidden"> <Bars3Icon class="w-6 h-6 text-pink-400" /></label>
            <button @click="$emit('toggle')" class="btn btn-ghost lg:hidden">
                <PencilIcon v-if="!props.view" class="w-6 h-6 text-blue-400" />
                <EyeIcon v-else class="w-6 h-6 text-blue-400" />
            </button>
            <input @blur="store.saveNote" v-if="props.view" type="text" class="sm:hidden w-full mx-2 bg-transparent border-0 border-b-pink-400 border-b-2 px-2 font-mono text-lg" v-model="note.title" />
            <div v-else class="font-mono text-lg px-4 sm:hidden">
                {{ note.title }}
            </div>
            <input @blur="store.saveNote" type="text" class="hidden sm:flex w-full m-2 bg-transparent border-0 border-b-pink-400 border-b-2 font-mono text-lg" v-model="note.title" />
        </div>
        <div class="dropdown dropdown-hover dropdown-end p-2" v-if="note.key">
            <div class="flex items-center h-full">
                <EllipsisVerticalIcon tabindex="0" class="w-7 h-7 text-pink-400" />
            </div>
            <ul tabindex="0" class="dropdown-content shadow rounded-box w-48 bg-black text-white space-y-3 flex flex-col py-4 px-4">
                <button class="flex justify-start items-center hover:bg-blue-800 hover:bg-opacity-50 p-2 rounded-lg" @click="store.saveNote()">
                    <DocumentArrowUpIcon class="h-6 w-6 text-pink-400" />
                    <div class="ml-4">Save note</div>
                </button>
                <!-- <button class="flex justify-start items-center hover:bg-blue-800 hover:bg-opacity-50 p-2 rounded-lg" @click="store.shareNote">
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
const props = defineProps(["view"]);
</script>
