<template>
    <div class="toast toast-bottom">
        <div class="bg-neutral font-mono text-neutral-content p-4 rounded-lg text-lg border-primary border-2">
            <div>
                <span>{{ text }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps(["text"]);
</script>
