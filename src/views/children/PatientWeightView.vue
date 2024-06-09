<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import useWeight from '../../hooks/useWeight';
    import withReadOnlyControls from '../../mixins/withReadonlyControls';
    import EntityPageObserver from '../../components/EntityPageObserver.vue';
    import { alias } from '../../models/Weight';
    import { computed, onMounted } from 'vue';
import Weight from '../../models/Weight';

    const route = useRoute();
    const { getPageByPatientId } = useWeight();
    const { page, error, totalPages, isPageLoading, onGetPage} = withReadOnlyControls<Weight>(
        { getPage: (pageNum: number) => getPageByPatientId(+route.params.id || 0, pageNum) }
    );

    const weights = computed(() => page.value.map(w => w.weight).reverse());
    const graphLabels = computed(() => page.value.map(p => p.date.toString().split(',')[1]).reverse());

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
                    <v-card-title>Нет данных об измерениях веса этим пациентом</v-card-title>
                </v-card>
            </v-col>
        </v-row>

        <v-row
            v-if="page.length > 1"
            justify="center"
            class="mt-3"
        >
            <v-col>
                <v-card>
                    <v-card-subtitle class="mt-2">
                        Крайнее значение
                    </v-card-subtitle>
                    <v-card-title>
                            {{ weights[weights.length - 1] }}
                    </v-card-title>

                    <v-sparkline
                        :gradient="['#ffd200']"
                        :line-width="1"
                        :model-value="weights"
                        :labels="graphLabels"
                        :smooth="true"
                        key="heartbeat-graph"
                        padding="10"
                        label-size="3"
                        auto-draw
                    />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>