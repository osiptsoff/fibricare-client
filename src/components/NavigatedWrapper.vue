<script setup lang="ts"> 
    import { logout } from '../hooks/useAuth.ts';

    defineProps<{
        menuEntries: Array<{
            name: string,
            routeName: string,
            icon?: string,
        }>
    }>();
</script>

<template>
        <v-navigation-drawer
            expand-on-hover
            rail
        >
            <slot>
            </slot>
            <v-list 
                density="compact"
                nav
            >
                <v-list-item
                    v-for="entry in menuEntries"
                    :key="entry.name + entry.routeName"
                    :title="entry.name"
                    :to="{name: entry.routeName}"
                    :prepend-icon="entry.icon"
                />
            </v-list>
            <v-divider/>
            <template v-slot:append>
                <v-list
                    density="compact"
                    nav
                >
                    <v-list-item 
                        @click="logout"
                        title="Выйти"
                        prepend-icon="mdi-logout"
                    />
                </v-list>
            </template>
        </v-navigation-drawer>
        <router-view/>
</template>
