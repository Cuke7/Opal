<template>
    <div class="h-full bg-base-100 flex justify-start items-center flex-col px-8 font-mono overflow-y-auto text-neutral-content">
        <div class="w-full lg:w-1/2">
            <div class="flex items-center lg:justify-start justify-around mb-8 mt-16 sm:my-20 lg:space-x-12">
                <img src="../assets/opal.png" alt="" class="h-24" />
                <div class="text-primary text-7xl my-8">Opal</div>
            </div>
            <label for="my-drawer-2" class="btn btn-ghost drawer-button absolute left-6 top-6"> <Bars3Icon class="w-6 h-6 text-secondary" /></label>

            <div class="font-mono text-lg bg-neutral rounded-lg p-4 mx-2 w-fit">
                <div class="mx-2">A <span class="text-primary">markdown</span> based, <span class="text-secondary">note taking</span> web application.</div>
                <router-link to="/tutorial" class="flex items-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg my-2 p-2">
                    <InformationCircleIcon class="h-6 w-6 text-primary mr-4" />
                    Tutorial
                </router-link>
                <button class="flex items-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg p-2 w-full" v-if="!user" @click="store.login">
                    <ArrowLeftOnRectangleIcon class="h-6 w-6 text-primary mr-4" />
                    Log in
                </button>
                <button class="flex items-center hover:bg-blue-800 hover:bg-opacity-50 rounded-lg p-2 w-full" v-if="user" @click="store.logout">
                    <ArrowRightOnRectangleIcon class="h-6 w-6 text-primary mr-4" />
                    Log out
                </button>
            </div>

            <div v-if="notesDrawer" class="w-full flex flex-wrap mt-12 sm:mt-20 justify-start items-center">
                <router-link :to="`${note.key}`" v-for="note in notesDrawer" class="border-primary border-2 flex items-center hover:border-secondary rounded-lg p-2 m-2">
                    <ClipboardIcon class="h-6 w-6 text-secondary mr-2" />
                    {{ note.title }}
                </router-link>
                <button v-if="user" class="flex items-center border-primary border-2 hover:border-secondary rounded-lg p-2 m-2" @click="createNewNote">
                    <PlusIcon class="h-6 w-6 text-secondary mr-4" />
                    Add a new note
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowLeftOnRectangleIcon, InformationCircleIcon, ClipboardIcon, ArrowRightOnRectangleIcon, PlusIcon, Bars3Icon } from "@heroicons/vue/24/outline";
import { user, store, notesDrawer, db } from "../store";
import { useRouter } from "vue-router";
import { setDoc, collection, doc } from "firebase/firestore";

const router = useRouter();

const createNewNote = async () => {
    try {
        let newDoc = doc(collection(db, user.value.uid));
        setDoc(newDoc, { title: "My new note", text: "# Hi mom" }).then(() => {});
        router.push(newDoc.id);
        store.toast("Note created", 2000);
    } catch {
        store.toast("Can't create new note", 2000);
    }
};
</script>
