import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue"
import Editor from "./views/Editor.vue"
import SharedNote from "./views/SharedNote.vue"


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/", name: "Home", component: Home
        },
        {
            path: "/:key", name: "Editor", component: Editor
        },
        {
            path: "/:uid/:key", name: "SharedNote", component: SharedNote
        },
    ]
})

createApp(App).use(router).mount('#app')
