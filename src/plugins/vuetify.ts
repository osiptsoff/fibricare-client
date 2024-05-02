import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from "vuetify";
import * as styles from "vuetify/_styles.scss";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import * as icons from "vuetify/iconsets/mdi-svg";

const vuetify = createVuetify( {
    theme: {
        defaultTheme: 'dark',
    },

    components,
    directives,
    styles,
    icons
});

export { vuetify };
