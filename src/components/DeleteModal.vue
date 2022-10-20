<template>
    <!-- The button to open modal -->

    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="my-modal-6" class="modal-toggle" />
    <label for="my-modal-6" class="modal modal-bottom sm:modal-middle cursor-pointer">
        <div class="modal-box bg-neutral relative sm:border-2 border-t-2 border-primary">
            <h3 class="font-bold text-lg">Just to make sure...</h3>
            <p class="py-4">Are you sure you want to delete this note?</p>
            <div class="flex justify-end space-x-10">
                <label for="my-modal-6" class="btn border-error border-2 btn-ghost hover:border-error">No</label>
                <label @click="deleteTheNote" for="my-modal-6" class="btn border-primary border-2 btn-ghost hover:border-primary">Yes</label>
            </div>
        </div>
    </label>
</template>

<script setup lang="ts">
import { store, db, user, note } from "../store";
import { useRouter } from "vue-router";
import { doc, deleteDoc } from "firebase/firestore";

const router = useRouter();

const deleteTheNote = () => {
    deleteDoc(doc(db, user.value.uid, String(note.value.key)));
    store.toast("Note deleted", 2000);
    router.push("/");
};
</script>
