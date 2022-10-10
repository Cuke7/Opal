<template>
    <!-- The button to open modal -->

    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="my-modal-6" class="modal-toggle" />
    <label for="my-modal-6" class="modal modal-bottom sm:modal-middle cursor-pointer">
        <div class="modal-box bg-slate-800 text-white">
            <h3 class="font-bold text-lg">Just to make sure</h3>
            <p class="py-4">Are you sure you want to delete this note?</p>
            <div class="flex justify-end space-x-10">
                <label for="my-modal-6" class="btn bg-red-600 btn-ghost hover:bg-blue-800 hover:bg-opacity-50">No</label>
                <label @click="store.deleteNote" for="my-modal-6" class="btn bg-pink-400 btn-ghost hover:bg-blue-800 hover:bg-opacity-50">Yes</label>
            </div>
        </div>
    </label>
</template>

<script setup lang="ts">
import { store } from "../store";
</script>
