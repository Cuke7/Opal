<template>
    <div class="flex h-full bg-base-100 text-base-content p-4 sm:px-8">
        <div ref="editor" class="h-full sm:w-1/2 sm:flex flex-col w-full flex hidden" v-if="!viewOnly">
            <ToolBar @toggle="toggle" :view="view" class="w-full lg:w-1/2" />
            <textarea @blur="saveNote" v-model="note.text" class="flex-1 bg-transparent w-full overflow-y-auto p-8 pt-4 lg:text-lg pb-32"> </textarea>
        </div>
        <div ref="render" class="h-full sm:w-1/2 sm:flex flex-col w-full flex flex-1">
            <ToolBar @toggle="toggle" :view="view" class="sm:hidden" />
            <div ref="prose" class="flex-1 bg-transparent overflow-y-auto prose max-w-[1000px] p-8 pt-4 sm:pr-16 lg:prose-lg rounded-t-2xl lg:prose-pre:max-w-fit pb-32" v-html="html" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import ToolBar from "../components/ToolBar.vue";
import { saveNote, note, viewOnly } from "../store";
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
const prose = ref<HTMLDivElement | null>(null);

function toggle() {
    render.value?.classList.toggle("hidden");
    editor.value?.classList.toggle("hidden");
    view.value = !view.value;
}
</script>
