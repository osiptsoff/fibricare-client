<script setup lang="ts">
    import { onMounted } from 'vue';
    import EntityForm from '../../components/EntityForm.vue';
    import EntityPageObserver from '../../components/EntityPageObserver.vue';
    import usePatient from '../../hooks/usePatient';
    import withControls from '../../mixins/withControls';
    import Patient, { alias, fields } from '../../models/Patient';

    const hooks = usePatient();

    const {
        page,
        totalPages,
        isFormDisplayed,
        isConfirmDialogDisplayed,
        isPageLoading,
        errorText,
        updateCandidate,

        onDelete,
        onFormSubmit,
        onGetPage,
        onAdd,
        performDelete,
        onUpdate,
    } = withControls<Patient>(hooks);

    onMounted(() => onGetPage(1));
</script>

<template>
    <v-dialog v-model="isFormDisplayed" max-width="50%">
        <v-sheet class="rounded pa-5 mt-10">
            <entity-form
                @submit="onFormSubmit($event as unknown as Patient)"
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
            title="Удалить пользователя?"
            text="Вы действительно хотите удалить пользователя и связанные с ним данные?
                    Отменить действие будет невозможно."
        >
            <template v-slot:actions>
                <v-spacer></v-spacer>

                <v-btn @click="performDelete">
                    Удалить
                </v-btn>
            </template>
        </v-card>
    </v-dialog>

    <entity-page-observer
        @change-page="onGetPage($event.newPage)"
        @add="onAdd"
        @delete="onDelete($event.id)"
        @update="onUpdate($event.id)"
        :entities="page"
        :max-page="totalPages"
        :id-props="['id']"
        :header-props="['name', 'birthDate']"
        :entity-props-alias="alias"
        :is-loading="isPageLoading"
    />
</template>