import App from './App.vue'
import Default from './layouts/default/Default.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'

// import "bootstrap/dist/css/bootstrap.css";

const app = createApp(App)

app.component('LayoutDefault', Default)
app.use(createPinia())
app.use(router)

app.mount('#app')

import * as bootstrap from 'bootstrap'
import "bootstrap/dist/js/bootstrap.js";
