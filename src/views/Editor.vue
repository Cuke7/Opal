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

const tuto = `# Title 1
## Title 2
### Title 3
#### Title 4

There's a nice horizontal line:
***

Text can be *italic*, **bold**, even ***both*** or ~~striked~~.

> You can also write quotes.

Writing links is easy, here's one: [bird pictures](https://louiscassany.carrd.co/).

And there's some lists:
- one
- two
  - use 2 spaces for
  - a nested list,
1. one again
2. two again
3. ...

If you got a link, showing images is easy:
![](https://louiscassany.carrd.co/assets/images/gallery01/0ae078f9_original.jpg?v=88049563)

When writing lists, spaces and newlines are important. Writing this:
\`\`\`
***
- first
-second
A new line.
***
\`\`\`
will produce the following outcome:
***
- first
-second
A new line.
***
What you want to write is this:
\`\`\` 
***
- first
- second

A new line.
***
\`\`\`

In order to procuce this:
***
- first
- second

A new line.
***
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
