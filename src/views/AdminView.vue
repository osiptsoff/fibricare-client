<script setup lang="ts">
    import { ref } from 'vue';
    import NavigatedWrapper from '../components/NavigatedWrapper.vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();

    const entries = ref( [
        {
            name: 'Врачи',
            routeName: 'admin-doctors',
            icon: 'mdi-doctor',

        },
        {
            name: 'Пациенты',
            routeName: 'admin-patients',
            icon: 'mdi-bed-empty',
        }
    ]);

    const isChildViewActive = () => {
        return route.name !== 'admin';
    }
</script>

<template>
    <navigated-wrapper
        :menuEntries="entries"
    />

    <v-card
        v-if="!isChildViewActive()"
        class="ma-5 pa-5"
    >
        <v-card-title>
            Здравствуйте, администратор!
        </v-card-title>
        <v-card-text>
            Для начала работы перейдите по одному из пунктов меню слева.
        </v-card-text>
    </v-card>
</template>