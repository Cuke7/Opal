<template>
    <div class="flex h-full bg-gray-900 text-white p-4 sm:px-8">
        <div ref="editor" class="h-full sm:w-1/2 sm:flex flex-col w-full flex hidden">
            <ToolBar @toggle="toggle" :view="view" class="lg:w-1/2" />
            <textarea @blur="store.saveNote" v-model="note.text" class="flex-1 bg-transparent w-full overflow-y-auto p-8 pt-4 lg:text-lg bg-opacity-20"> </textarea>
        </div>
        <div ref="render" class="sm:ml-8 h-full sm:w-1/2 sm:flex flex-col w-full flex flex-1">
            <ToolBar @toggle="toggle" :view="view" class="sm:hidden" />
            <div class="flex-1 bg-transparent overflow-y-auto prose max-w-none p-8 pt-4 sm:pr-16 lg:prose-lg !prose-invert bg-opacity-20 rounded-t-2xl" v-html="html" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import ToolBar from "../components/ToolBar.vue";
import { store, note } from "../store";
import { marked } from "marked";

const html = computed(() => {
    if (note.value.text) {
        let md = note.value.text;
        return marked.parse(md);
    }
    return "";
});

const editor = ref<HTMLDivElement | null>(null);
const render = ref<HTMLDivElement | null>(null);
const view = ref(false);

function toggle() {
    render.value?.classList.toggle("hidden");
    editor.value?.classList.toggle("hidden");
    view.value = !view.value;
}
</script>
