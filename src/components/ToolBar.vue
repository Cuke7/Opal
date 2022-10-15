<template>
    <div class="p-2 bg-neutral rounded-3xl flex justify-between">
        <div class="flex items-center">
            <label for="my-drawer-2" class="btn btn-ghost drawer-button lg:hidden"> <Bars3Icon class="w-6 h-6 text-secondary" /></label>
            <button @click="$emit('toggle')" class="btn btn-ghost lg:hidden">
                <PencilIcon v-if="!props.view" class="w-6 h-6 text-primary" />
                <EyeIcon v-else class="w-6 h-6 text-primary" />
            </button>
            <input @blur="store.saveNote" v-if="props.view" type="text" class="sm:hidden w-full mx-2 bg-transparent border-0 border-b-secondary border-b-2 px-2 font-mono text-lg text-neutral-conent" v-model="note.title" />
            <div v-else class="font-mono text-lg px-4 sm:hidden">
                {{ note.title }}
            </div>
            <input @blur="store.saveNote" type="text" class="hidden sm:flex w-full m-2 bg-transparent border-0 border-b-secondary border-b-2 font-mono text-lg text-neutral-content" v-model="note.title" />
        </div>
        <div class="dropdown dropdown-hover dropdown-end p-2" v-if="note.key">
            <div class="flex items-center h-full">
                <EllipsisVerticalIcon tabindex="0" class="w-7 h-7 text-secondary" />
            </div>
            <ul tabindex="0" class="dropdown-content shadow rounded-box w-48 bg-base-300 text-white space-y-3 flex flex-col py-4 px-4">
                <button class="flex justify-start items-center hover:bg-info hover:bg-opacity-50 p-2 rounded-lg" @click="store.saveNote()">
                    <DocumentArrowUpIcon class="h-6 w-6 text-secondary" />
                    <div class="ml-4">Save</div>
                </button>
                <!-- <button for="my-modal-4" class="modal-button flex justify-start items-center hover:bg-blue-800 hover:bg-opacity-50 p-2 rounded-lg cursor-pointer" @click="copy">
                    <ShareIcon class="h-6 w-6 text-secondary" />
                    <div class="ml-4">Share</div>
                </button> -->
                <label for="my-modal-6" class="modal-button flex justify-start items-center hover:bg-info hover:bg-opacity-50 0 p-2 rounded-lg cursor-pointer">
                    <TrashIcon class="h-6 w-6 text-secondary" />
                    <div class="ml-4">Delete</div>
                </label>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { store, note, user } from "../store";
import { DocumentArrowUpIcon, TrashIcon, EyeIcon, Bars3Icon, PencilIcon, ShareIcon, EllipsisVerticalIcon } from "@heroicons/vue/24/outline";
const props = defineProps(["view"]);
const copy = () => {
    navigator.clipboard.writeText("https://opal-app.netlify.app/" + user.value.uid + "/" + note.value.key);
    store.toast("Link copied", 3000);
};
</script>
