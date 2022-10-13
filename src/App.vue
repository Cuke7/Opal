<template>
    <div class="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" v-model="drawer" />
        <div class="drawer-content">
            <div class="h-screen">
                <router-view></router-view>
                <!-- <div class="flex h-full bg-gray-900 text-white py-8 px-4 sm:px-8">
                    <div ref="editor" class="h-full sm:w-1/2 sm:flex flex-col w-full flex hidden">
                        <ToolBar @toggle="toggle" :view="view" class="lg:w-1/2" />
                        <textarea @blur="store.saveNote" v-model="note.text" class="flex-1 bg-transparent w-full overflow-y-auto px-8 py-4 lg:text-lg bg-opacity-20"> </textarea>
                    </div>
                    <div ref="render" class="sm:ml-8 h-full sm:w-1/2 sm:flex flex-col w-full flex flex-1">
                        <ToolBar @toggle="toggle" :view="view" class="sm:hidden" />
                        <div class="flex-1 bg-transparent overflow-y-auto prose max-w-none px-4 sm:pr-16 lg:prose-lg !prose-invert bg-opacity-20 rounded-t-2xl" v-html="html" />
                    </div>
                </div> -->
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
import Toast from "./components/Toast.vue";
import { store, drawer } from "./store";
import DrawerContent from "./components/DrawerContent.vue";
import DeleteModal from "./components/DeleteModal.vue";

</script>
