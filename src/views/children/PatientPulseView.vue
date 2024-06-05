<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import usePulse from '../../hooks/usePulse';
    import withReadOnlyControls from '../../mixins/withReadonlyControls';
    import EntityPageObserver from '../../components/EntityPageObserver.vue';
    import Pulse, { alias } from '../../models/Pulse';
    import { computed, onMounted } from 'vue';

    const route = useRoute();
    const { getPageByPatientId } = usePulse();
    const { page, error, totalPages, isPageLoading, onGetPage} = withReadOnlyControls<Pulse>(
        { getPage: (pageNum: number) => getPageByPatientId(+route.params.id || 0, pageNum) }
    );

    const rates = computed(() => page.value.map(p => p.rate).reverse());
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
                v-else
                class="text-center"
            >
                <v-card-title>Нет данных об измерениях ЧСС этим пациентом</v-card-title>
            </v-card>
            </v-col>
        </v-row>

        <v-row
            v-if="page.length > 1"
            justify="center"
            class="mt-10"
        >
            <v-col>
                <v-card>
                <v-card-subtitle class="mt-2">
                    Крайнее значение
                </v-card-subtitle>
                <v-card-title>
                        {{ rates[rates.length - 1] }}
                </v-card-title>

                <v-sparkline
                    :gradient="['#f72047', '#ffd200', '#1feaea']"
                    :line-width="1"
                    :model-value="rates"
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