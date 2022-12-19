<template>
    <div class="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" v-model="drawer" ref="drawer"/>
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
import { store, drawer, db, user, auth, notesDrawer } from "./store";
import DrawerContent from "./components/DrawerContent.vue";
import DeleteModal from "./components/DeleteModal.vue";
import { enableIndexedDbPersistence, query, collection, onSnapshot } from "firebase/firestore";
import { onMounted } from "vue";
import { onAuthStateChanged } from "firebase/auth";

onMounted(async () => {
    // let touchstartX = 0;
    // let touchendX = 0;
    // const drawer = ref<HTMLInputElement | null>(null);

    // function checkDirection() {
    //     if (touchendX > touchstartX + 50 && touchstartX < 40) drawer.value.checked = true;
    // }

    // document.addEventListener("touchstart", (e) => {
    //     touchstartX = e.changedTouches[0].clientX;
    //     e.stopPropagation();
    // });

    // document.addEventListener("touchend", (e) => {
    //     touchendX = e.changedTouches[0].clientX;
    //     checkDirection();
    // });

    await enableIndexedDbPersistence(db).catch((err: any) => {
        console.error(err);
    });
    onAuthStateChanged(auth, async (user2) => {
        if (user2) {
            user.value = user2;
            console.log("onAuthStateChanged", "Signed in");
            const q = query(collection(db, user.value.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                notesDrawer.value = [];
                querySnapshot.forEach((doc) => {
                    notesDrawer.value.push({ ...doc.data(), key: doc.id });
                });
            });
            store.toast("Logged in!", 2000);
        } else {
            user.value = null;
            console.log("Logged out!", user2);
            store.toast("Logged out!", 2000);
        }
    });
});
</script>
