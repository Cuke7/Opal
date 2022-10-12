<template>
    <Note />
</template>

<script setup lang="ts">
import Note from "../components/Note.vue";
import { store, user, note } from "../store";
import { useRoute, useRouter } from "vue-router";
import { watch } from "vue";
const route = useRoute();
const router = useRouter();

const tuto = `# Hello first title
## Hello second title
### Hello third title
...

***

I can be *italic*, **bold** and even ***both***.
> I'm a quote.

And there's a list:

- one,
- ~~two~~,
  - use 2 spaces for
  - a nested list,
- tree.
`;

note.value = {
    text: "",
    title: "",
    key: "",
};

if (route.params.key == "tutorial") {
    note.value.text = tuto;
    note.value.title = "Markdown tutorial";
    note.value.key = null;
} else {
    if (!user.value) {
        router.push("/");
    } else {
        store.loadNote(user.value.uid, route.params.key + "");
    }
}

watch(
    () => route.params.key,
    (newKey) => {
        if (newKey == "tutorial") {
            note.value.text = tuto;
            note.value.title = "Markdown tutorial";
            note.value.key = null;
        } else {
            store.loadNote(user.value.uid, newKey + "");
        }
    }
);
</script>
