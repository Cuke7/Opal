<template>
    <div class="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" v-model="drawer" />
        <div class="drawer-content">
            <div class="h-screen">
                <!-- <div class="h-1/6 bg-gray-900 flex items-center justify-end">
                    <div class="flex h-full items-center">
                        <div class="text-5xl font-mono text-white mr-8">Opal</div>
                        <img src="./assets/stone.webp" class="w-auto h-full" alt="" />
                    </div>
                </div> -->
                <div class="flex h-full bg-gray-900 text-white p-4 sm:p-8">
                    <div ref="editor" class="h-full sm:w-1/2 sm:flex flex-col w-full flex hidden">
                        <ToolBar @toggle="toggle" :view="view" class="lg:w-1/2"/>
                        <textarea @blur="store.saveNote" v-model="note.text" class="flex-1 bg-transparent w-full overflow-y-auto px-8 py-4 lg:text-lg bg-opacity-20"> </textarea>
                    </div>
                    <div ref="render" class="sm:ml-8 h-full sm:w-1/2 sm:flex flex-col w-full flex flex-1">
                        <ToolBar @toggle="toggle" :view="view" class="sm:hidden" />
                        <div class="flex-1 bg-transparent overflow-y-auto prose max-w-none px-4 sm:pr-16 lg:prose-lg !prose-invert bg-opacity-20 rounded-t-2xl" v-html="html" />
                    </div>
                </div>
            </div>
        </div>
        <div class="drawer-side">
            <label for="my-drawer-2" class="drawer-overlay"></label>
            <DrawerContent />
        </div>
    </div>
    <Toast v-if="store.toastSettings.show" :text="store.toastSettings.text" />
    <DeleteModal />
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { marked } from "marked";
import Toast from "./components/Toast.vue";
import { store, note, drawer } from "./store";
import DrawerContent from "./components/DrawerContent.vue";
import DeleteModal from "./components/DeleteModal.vue";
import ToolBar from "./components/ToolBar.vue";

const view = ref(false);

const html = computed(() => {
    if (note.value.text) {
        let md = note.value.text;
        return marked.parse(md);
    }
    return "";
});

const editor = ref<HTMLDivElement | null>(null);
const render = ref<HTMLDivElement | null>(null);

function toggle() {
    render.value?.classList.toggle("hidden");
    editor.value?.classList.toggle("hidden");
    view.value = !view.value;
}
</script>
