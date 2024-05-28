<script setup lang="ts">
    import { ref } from 'vue';
    import NavigatedWrapper from '../components/NavigatedWrapper.vue';

    const entries = ref( [
        {
            name: 'entry1',
            routeName: 'home',
            icon: 'mdi-doctor',

        },
        {
            name: 'entry2',
            routeName: 'home',
            icon: 'mdi-bed-empty',
        }
    ]);
</script>

<template>
    <navigated-wrapper
        :menuEntries="entries"
    />
</template>