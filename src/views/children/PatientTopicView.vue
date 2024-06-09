<script setup lang="ts">
    import { onMounted } from 'vue';
    import EntityForm from '../../components/EntityForm.vue';
    import EntityPageObserver from '../../components/EntityPageObserver.vue';
    import useTopic from '../../hooks/useTopic';
    import withControls from '../../mixins/withControls';
    import Topic, { alias, fields } from '../../models/Topic';
    import { useActiveDoctorStore } from '../../stores/activeDoctorStore';

    const {selectedPatient, doctor} = useActiveDoctorStore();

    const hooks = useTopic();
    const getPage = (pageNumber: number) => hooks.getPageByIds(
        doctor.value?.id || -1, selectedPatient.value?.id || -1, pageNumber
    );

    const {
        page,
        totalPages,
        isFormDisplayed,
        isConfirmDialogDisplayed,
        isPageLoading,
        errorText,
        updateCandidate,

        onDelete,
        onFormSubmit: _onFormSubmit,
        onGetPage,
        onAdd,
        performDelete,
        onUpdate,
    } = withControls<Topic>({...hooks, getPage});

    const onFormSubmit = (visit: Topic) => {
        visit.doctorId = doctor.value?.id || -1;
        visit.patientId = selectedPatient.value?.id || -1;

        return _onFormSubmit(visit);
    };

    onMounted(() => onGetPage(1));
</script>

<template>
    <v-dialog v-model="isFormDisplayed" max-width="50%">
        <v-sheet class="rounded pa-5 mt-10">
            <entity-form
                @submit="onFormSubmit($event as unknown as Topic)"
                :fields="fields"
                :alias="alias"
                :defaults="updateCandidate"
            >
                <v-card
                        v-show="!!errorText"
                        class="mx-auto mb-5 text-center"
                        color="error"
                        variant="tonal"
                    >
                        <v-card-title>
                            {{ errorText }}
                        </v-card-title>
                </v-card>
            </entity-form>
        </v-sheet>
    </v-dialog>

    <v-dialog v-model="isConfirmDialogDisplayed" max-width="50%">
        <v-card
            class="rounded pa-5 mt-10"
            prepend-icon="mdi-exclamation-thick"
            title="Удалить предписание?"
            text="Вы действительно хотите удалить предписание?
                    Отменить действие будет невозможно, пациент прекратит получать уведомления."
        >
            <template v-slot:actions>
                <v-spacer></v-spacer>

                <v-btn @click="performDelete">
                    Удалить
                </v-btn>
            </template>
        </v-card>
    </v-dialog>

    <v-row justify="center" class="mt-0">
        <v-col>
            <entity-page-observer
                @change-page="onGetPage($event.newPage)"
                @add="onAdd"
                @delete="onDelete($event.id)"
                @update="onUpdate($event.id)"
                :entities="page"
                :max-page="totalPages"
                :id-props="['id']"
                :hidden-props="['id', 'patientId', 'doctorId']"
                :header-props="['startTime']"
                :entity-props-alias="alias"
                :is-loading="isPageLoading"
            />
        </v-col>
    </v-row>
</template>