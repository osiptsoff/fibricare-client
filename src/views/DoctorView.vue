<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import EntityPageObserver from '../components/EntityPageObserver.vue';
    import { logout } from '../hooks/useAuth.ts';
    import usePatient from '../hooks/usePatient';
    import withReadOnlyControls from '../mixins/withReadonlyControls.ts';
    import Patient, { alias } from '../models/Patient';
    import { useActiveDoctorStore } from '../stores/activeDoctorStore';

    const { getPageByDoctorId } = usePatient();
    const { doctor, setSelectedPatient, init } = useActiveDoctorStore();
    const { page, error, totalPages, isPageLoading, onGetPage} = withReadOnlyControls<Patient>(
        {getPage: (pageNum: number) => getPageByDoctorId(doctor.value?.id || 0, pageNum) }
    );
    const route = useRoute();
    const router = useRouter();

    const isChildViewActive = () => {
        return route.name !== 'doctor';
    }

    const onExpand = (isExpanded: boolean, expandedId: number) => {
        if(!isExpanded) {
            return;
        }

        setSelectedPatient(page.value.find(p => p.id === expandedId) as Patient);

        router.replace({
            name: 'doctor-patient',
            params: { id: expandedId }
        });
    }

    onMounted(async () => {
        await init();
        onGetPage(1);
    })
</script>

<template>
    <v-card
        v-if="!!error"
        class="mx-auto mb-5 text-center"
        color="error"
        variant="tonal"
    >
        <v-card-title>
            {{ error }}
        </v-card-title>
    </v-card>

    <v-container v-if="!isChildViewActive() && !error" class="mt-2">
        <v-row justify="center">
            <v-col cols="9">
                <v-card class="text-center">
                    <v-card-title>
                        {{ 'Здравствуйте, ' + doctor?.name + '!' }}
                    </v-card-title>
                    <v-card-subtitle>
                        Выберете пациента для работы.
                    </v-card-subtitle>
                    <v-card-actions>
                    <v-row justify="center">
                        <v-col cols="2">
                            <v-btn
                                @click="logout"
                                class="rounded"
                                block
                            >
                            Выйти
                            </v-btn>
                        </v-col>
                    </v-row>
                    </v-card-actions>
                </v-card>  
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col cols="9">
                <entity-page-observer
                    v-if="page.length > 0"
                    @change-page="onGetPage($event.newPage)"
                    @expand="onExpand($event.isExpanded, $event.id.id)"
                    :entities="page"
                    :maxPage="totalPages"
                    :id-props="['id']"
                    :header-props="['name', 'birthDate']"
                    :entity-props-alias="alias"
                    :hiddenProps="['login', 'id', 'doctorId']"
                    :readonly="true"
                    :is-loading="isPageLoading"
                />
                <v-card
                    v-else
                    class="text-center"
                >
                    <v-card-title>Нет связанных с вами пациентов</v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <router-view v-else/>
</template>