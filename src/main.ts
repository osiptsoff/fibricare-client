import { createApp } from 'vue';
import { pinia } from './plugins/pinia';
import { vuetify } from './plugins/vuetify';

import App from './App.vue';
import router from './router/index';

const app = createApp(App);

app
    .use(pinia)
    .use(vuetify)
    .use(router)
    .mount('#app');