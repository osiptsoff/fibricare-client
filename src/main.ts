import { vuetify } from './plugins/vuetify';

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

app
    .use(vuetify)
    .mount('#app');