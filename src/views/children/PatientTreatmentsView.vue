<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import EntityPageObserver from '../../components/EntityPageObserver.vue';
    import useTreatments from '../../hooks/useTreatments';
    import withReadOnlyControls from '../../mixins/withReadonlyControls';
    import Treatments, { alias } from '../../models/Treatments';

    const route = useRoute();
    const { getPageByPatientId } = useTreatments();
    const { page, error, totalPages, isPageLoading, onGetPage} = withReadOnlyControls<Treatments>(
        { getPage: (pageNum: number) => getPageByPatientId(+route.params.id || 0, pageNum) }
    );

    onMounted( async () => { await onGetPage(1) });
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
    
    <v-container
        v-else
        class="mt-2 pa-0"
    >
        <v-row justify="center">
            <v-col>
                <entity-page-observer
                    v-if="page.length > 0"
                    @change-page="onGetPage($event.newPage)"
                    :entities="page"
                    :maxPage="totalPages"
                    :id-props="['id']"
                    :header-props="['date']"
                    :entity-props-alias="alias"
                    :hiddenProps="['id', 'patientId', 'topicId']"
                    :readonly="true"
                    :is-loading="isPageLoading"
                />
                <v-card
                    v-if="page.length === 0 && !isPageLoading"
                    class="text-center"
                >
                    <v-card-title>Нет данных о приеме препаратов этим пациентом</v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>