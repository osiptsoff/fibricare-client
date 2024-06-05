<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import withInit from '../../mixins/withInit';
    import NavigatedWrapper from '../../components/NavigatedWrapper.vue';
    import { useActiveDoctorStore } from '../../stores/activeDoctorStore';
    import { alias } from '../../models/Patient';
    import EntityObserver from '../../components/EntityObserver.vue';

    const { selectedPatient } = useActiveDoctorStore();
    const route = useRoute();
    const router = useRouter();
    const { initError, init } = withInit(+route.params.id);

    const entries = ref( [
        {
            name: 'Шкала CHADS2-VASC',
            routeName: 'patient-chads',
            icon: 'mdi-alpha-c-circle',

        },
        {
            name: 'Шкала HAS-BLED',
            routeName: 'patient-hasbled',
            icon: 'mdi-alpha-h-circle',
        },
        {
            name: 'МНО',
            routeName: 'patient-inr',
            icon: 'mdi-alpha-i-circle',
        },
        {
            name: 'Приемы',
            routeName: 'patient-visit',
            icon: 'mdi-forum',
        },
        {
            name: 'Предписания',
            routeName: 'patient-topic',
            icon: 'mdi-script',
        },
        {
            name: 'ЧСС',
            routeName: 'patient-heartbeat',
            icon: 'mdi-pulse',
        },
        {
            name: 'Артериальное давление',
            routeName: 'patient-pressure',
            icon: 'mdi-account-heart',
        },
        {
            name: 'Вес',
            routeName: 'patient-weight',
            icon: 'mdi-weight',
        },
        {
            name: 'Жалобы',
            routeName: 'patient-complaints',
            icon: 'mdi-account-alert',
        },
        {
            name: 'Физическая активность',
            routeName: 'patient-activity',
            icon: 'mdi-run',
        },
    ]);

    const onGoBack = () => {
        router.replace({name: 'doctor'})
    };

    onMounted(async () => await init() );
</script>

<template>
    <v-card
        v-if="initError"
        class="mx-auto mb-5 text-center"
        color="error"
        variant="tonal"
    >
        <v-card-title>
            {{ initError }}
        </v-card-title>
    </v-card>

    <v-row
        v-else
        class="mt-5 text-center"
        justify="center"
    >
        <v-col cols="8">
            <v-sheet rounded>
                <entity-observer
                    :entity="selectedPatient || {}"
                    :entity-props-alias="alias"
                    :header-props="['name']"
                    :hiddenProps="['login', 'id', 'doctorId']"
                    :readonly="true"
                /> 
            </v-sheet>
            
        </v-col>
    </v-row>

    <v-row justify="center">
        <v-col cols="8">
            <navigated-wrapper
        :menu-entries="entries"
    >
        <v-list
            density="compact"
            nav
        >
            <v-list-item 
                @click="onGoBack"
                title="Назад"
                prepend-icon="mdi-undo"
            />
        </v-list>
        <v-divider/>
    </navigated-wrapper>
        </v-col>
    </v-row>
</template>