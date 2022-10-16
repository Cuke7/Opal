<template>
    <div ref="themeSwitch" @click="dark = !dark" class="swap swap-rotate flex hover:bg-info p-2 rounded-lg hover:bg-opacity-50 justify-start" data-toggle-theme="dark,light" data-act-class="swap-active">
        <div class="swap">
            <MoonIcon class="swap-off h-6 w-6 text-primary mr-4" />
            <SunIcon class="swap-on h-6 w-6 text-primary mr-4" />
        </div>
        <div v-if="dark">Dark mode</div>
        <div v-else>Light mode</div>
    </div>
</template>

<script setup lang="ts">
import { MoonIcon, SunIcon } from "@heroicons/vue/24/outline";

import { onMounted, ref } from "vue";
import { themeChange } from "theme-change";
const themeSwitch = ref<HTMLInputElement | null>(null);

const darkText = ref("Dark mode");
const dark = ref(true);

onMounted(() => {
    themeChange(false);
    if (localStorage.theme) {
        dark.value = localStorage.theme == "dark";
    } else {
        localStorage.theme = "dark";
        dark.value = true;
    }
});
</script>
