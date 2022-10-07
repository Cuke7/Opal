<template>
    <div class="toast toast-bottom">
        <div class="alert alert-info">
            <div>
                <span>{{ text }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps(["text"]);
</script>
