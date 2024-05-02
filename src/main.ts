import { vuetify } from './plugins/vuetify';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router/index';

const app = createApp(App);

app
    .use(vuetify)
    .use(router)
    .mount('#app');