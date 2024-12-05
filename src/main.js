
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import 'primeicons/primeicons.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import router from '@/router'   // don't need 'index.js'


// createApp(App).mount('#app')
const app = createApp(App);
app.use(router).use(Toast).mount('#app')
