<template>
    <div class="h-20 bg-black sm:border-b-gray-700 sm:border-b-2 rounded-3xl sm:rounded-none sm:rounded-t-2xl justify-around items-center flex bg-opacity-30">
        <label for="my-drawer-2" class="btn btn-ghost drawer-button lg:hidden"> <Bars3Icon class="w-6 h-6 text-pink-400" /></label>
        <button @click="$emit('toggle')" class="btn btn-ghost lg:hidden">
            <PencilIcon v-if="!props.view" class="w-6 h-6 text-pink-400" />
            <EyeIcon v-else class="w-6 h-6 text-pink-400" />
        </button>
        <input v-if="props.view" type="text" class="w-2/5 bg-transparent border-pink-400 border-2 rounded-lg px-2 font-mono text-lg" v-model="note.title" />
        <div v-else class="font-mono text-lg w-2/5">
            {{ note.title }}
        </div>
        <label for="my-modal-6" class="btn modal-button btn-ghost hover:bg-blue-800 hover:bg-opacity-50" v-if="store.currentKey">
            <TrashIcon class="h-6 w-6 text-pink-400" />
        </label>
        <button class="btn btn-ghost hover:bg-blue-800 hover:bg-opacity-50" @click="store.saveNote()" v-if="store.currentKey">
            <DocumentArrowUpIcon class="h-6 w-6 text-pink-400" />
        </button>
    </div>
</template>

<script lang="ts" setup>
import { store, note } from "../store";
import { DocumentArrowUpIcon, TrashIcon, EyeIcon, Bars3Icon, PencilIcon } from "@heroicons/vue/24/outline";
const props = defineProps(["view"]);
</script>
