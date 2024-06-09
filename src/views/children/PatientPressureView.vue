<script setup lang="ts">
    import { computed, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import EntityPageObserver from '../../components/EntityPageObserver.vue';
    import useBloodPressure from '../../hooks/useBloodPressure';
    import withReadOnlyControls from '../../mixins/withReadonlyControls';
    import BloodPressure, { alias } from '../../models/BloodPressure';

    const route = useRoute();
    const { getPageByPatientId } = useBloodPressure();
    const { page, error, totalPages, isPageLoading, onGetPage} = withReadOnlyControls<BloodPressure>(
        { getPage: (pageNum: number) => getPageByPatientId(+route.params.id || 0, pageNum) }
    );

    const systolic = computed(() => page.value.map(p => p.systolic).reverse());
    const diastolic = computed(() => page.value.map(p => p.diastolic).reverse());
    const lastIdx = computed(() => page.value.length - 1);
    const lastVal = computed(() => systolic.value[lastIdx.value] + '/' + diastolic.value[lastIdx.value]);

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
                    <v-card-title>Нет данных об измерениях давления этим пациентом</v-card-title>
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
                            {{ lastVal }}
                    </v-card-title>

                    <v-sparkline
                        :gradient="['green']"
                        :line-width="1"
                        :model-value="systolic"
                        :labels="systolic"
                        :smooth="true"
                        key="systolic"
                        padding="10"
                        label-size="3"
                        auto-draw
                    />
                    <v-divider/>
                    <v-sparkline
                        :gradient="['navy']"
                        :line-width="1"
                        :model-value="diastolic"
                        :labels="diastolic"
                        :smooth="true"
                        key="diastolic"
                        padding="10"
                        label-size="3"
                        auto-draw
                    />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
