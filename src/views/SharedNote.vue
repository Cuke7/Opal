<template>
    <div class="flex h-full bg-gray-900 text-white p-4 sm:px-8">
        <div ref="render" class="flex flex-col w-full flex-1">
            <div class="flex items-center justify-around">
                <RouterLink to="/" class="border-blue-400 border-2 flex items-center hover:border-pink-400 rounded-lg p-2 px-4 m-2 font-mono font-bold text-lg">
                    <img src="../assets/opal.png" class="h-10 w-10 mr-4" alt="" />
                    Opal
                </RouterLink>
                <div class="flex flex-col justify-center items-center">
                    <div class="text-2xl text-pink-400 mx-auto font-mono font-bold">
                        {{ note.title }}
                    </div>
                    <div class="text-gray-400 font-mono italic mx-auto">(Louis Cassany)</div>
                </div>
            </div>

            <div class="flex-1 bg-transparent overflow-y-auto prose max-w-none p-8 pt-4 sm:pr-16 lg:prose-lg !prose-invert bg-opacity-20 rounded-t-2xl" v-html="html" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { note, store } from "../store";
import { computed } from "vue";
import { marked } from "marked";

const route = useRoute();

note.value = {
    text: "",
    title: "",
    key: "",
};

const html = computed(() => {
    if (note.value.text) {
        let md = note.value.text;
        return marked.parse(md);
    }
    return "";
});

store.loadNote(route.params.uid + "", route.params.key + "");
</script>
