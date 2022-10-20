<template>
    <Note />
</template>

<script setup lang="ts">
import Note from "../components/Note.vue";
import { loadNote, user, note } from "../store";
import { useRoute, useRouter } from "vue-router";
import { watch } from "vue";
const route = useRoute();
const router = useRouter();

const tuto = `# Markdown tutorial

A quick introduction to markdown syntax.

## Text
Text can be *italic*, **bold**, even ***both*** or ~~striked~~.
\`\`\`
Text can be *italic*, **bold**, even ***both*** or ~~striked~~.
\`\`\`

## Horizontal lines
***
\`\`\`
***
\`\`\`

## Quotes
> You can also write quotes.
\`\`\`
> You can also write quotes.
\`\`\`

## Links
Writing links is easy, here's one: [bird pictures](https://louiscassany.carrd.co/).
\`\`\`
Writing links is easy, here's one: [bird pictures](https://louiscassany.carrd.co/).
\`\`\`

## Lists
And there's some lists:
- one
- two
  - use 2 spaces for
  - a nested list,
1. one again
2. two again
3. ...
\`\`\`
And there's some lists:
- one
- two
  - use 2 spaces for
  - a nested list,
1. one again
2. two again
3. ...
\`\`\`
## Images
If you got a link, showing images is easy:
![](https://louiscassany.carrd.co/assets/images/gallery01/0ae078f9_original.jpg?v=88049563)
\`\`\`
If you got a link, showing images is easy:
![](https://louiscassany.carrd.co/assets/images/gallery01/0ae078f9_original.jpg?v=88049563)
\`\`\`

## Markdown pitfalls

Markdown cares about **spaces** and **linebreaks**.
For instance, writing this:
\`\`\`
***
###Title
- first
-second
A new line.
***
\`\`\`
will produce the following outcome:
***
###Title
- first
-second
A new line.
***
What you want to write is this:
\`\`\` 
***
### Title
- first
- second

A new line.
***
\`\`\`

In order to procuce this:
***
### Title
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
    note.value.title = "Tutorial";
    note.value.key = null;
} else {
    if (!user.value) {
        router.push("/");
    } else {
        loadNote(String(route.params.key));
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
            loadNote(String(newKey));
        }
    }
);
</script>
