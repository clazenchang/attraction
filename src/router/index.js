import { createRouter, createWebHistory } from "vue-router";
import HomeView from '@/views/HomeView.vue'
import DestsView from "@/views/DestsView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import DestView from "@/views/DestView.vue";
import AddDestView from "@/views/AddDestView.vue";
import EditDestView from "@/views/EditDestView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'home', component: HomeView },
        { path: '/destinations', name: 'destinations', component: DestsView },
        { path: '/destinations/:id', name: 'dest', component: DestView },
        { path: '/destinations/add', name: 'add-dest', component: AddDestView },
        { path: '/destinations/edit/:id', name: 'edit-dest', component: EditDestView },
        { path: '/:pathMatch(.*)', name: 'not-found', component: NotFoundView }  // any file or resource we go to that doesn't exist
    ]
})

export default router;

