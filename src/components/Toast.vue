<template>
    <div class="toast toast-bottom">
        <div class="bg-info font-mono text-neutral-content font-bold p-4 rounded-lg text-lg">
            <div>
                <span>{{ text }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps(["text"]);
</script>
