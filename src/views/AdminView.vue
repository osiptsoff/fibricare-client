<script setup lang="ts">
import { ref } from 'vue';

    const stubArr = ref<Array<{name: string, path: string, icon:string}>>( [
        {
            name: 'Stub 1',
            path: 'stub1',
            icon: 'mdi-roman-numeral-1'

        },
        {
            name: 'Stub 2',
            path: 'stub2',
            icon: 'mdi-roman-numeral-2'
        },
    ]);
</script>

<template>
    <v-sheet>
        <v-navigation-drawer
            expand-on-hover
            rail
        >
            <v-list 
                density="compact"
                nav
            >
                <v-list-item 
                    v-for="elem in stubArr"
                    :title="elem.name"
                    :prepend-icon="elem.icon"
                    :to="elem.path"
                >
                </v-list-item>
            </v-list>
            <v-divider/>
            <template v-slot:append>
                <v-list
                    density="compact"
                    nav
                >
                    <v-list-item 
                        @click="console.log('click')"
                        title="Выйти"
                        prepend-icon="mdi-logout"
                    />
                </v-list>
            </template>
        </v-navigation-drawer>
        <router-view/>
    </v-sheet>
</template>