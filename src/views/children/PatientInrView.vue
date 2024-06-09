<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
import EntityForm from '../../components/EntityForm.vue';
import EntityPageObserver from '../../components/EntityPageObserver.vue';
import useInr from '../../hooks/useInr';
import Inr, { alias, fields } from '../../models/Inr';
import { useActiveDoctorStore } from '../../stores/activeDoctorStore';

    const { create, getPageByPatientId, remove } = useInr();
    const { selectedPatient } = useActiveDoctorStore();

    const page = ref<Array<Inr>>([]);
    const totalPages = ref<number>(1);
    const isFormDisplayed = ref<boolean>(false);
    const isConfirmDialogDisplayed = ref<boolean>(false);
    const isPageLoading = ref<boolean>(false);
    const errorText = ref<string>('');

    const _dateToDelete = ref<Date>(new Date());

    const _onAdd = async (obj: Inr) => {
        obj.patientId = selectedPatient.value?.id || -1;
        const result = await create(obj);

        if(typeof result != 'string') {
            page.value.unshift(result);

            isFormDisplayed.value = false;
            errorText.value = '';
        } else {
            errorText.value = result;
        }
    };

    const onAdd = async () => {
        isFormDisplayed.value = true;
    }

    const onDelete = (date: Date) => {
        _dateToDelete.value = date;

        isConfirmDialogDisplayed.value = true;
    }

    const onGetPage = async (requestedPage: number) => {
        isPageLoading.value = true;

        const pageResult = await getPageByPatientId(selectedPatient.value?.id || -1, requestedPage);

        if(typeof pageResult !== 'string') {
            page.value = pageResult.data;
            totalPages.value = pageResult.totalPages;
            errorText.value = '';
        } else {
            errorText.value = pageResult;
        }

        isPageLoading.value = false;
    };

    const performDelete = async () => {
        isConfirmDialogDisplayed.value = false;

        const deleteRes = await remove(selectedPatient.value?.id || -1, _dateToDelete.value);
        if(!deleteRes) {
            page.value = page.value.filter( d => d.date != _dateToDelete.value);
        } else {
            errorText.value = deleteRes;
        }

        _dateToDelete.value = new Date();
    }

    const inrs = computed(() => page.value.map(i => i.inrValue).reverse());
    const graphLabels = computed(() => page.value.map(p => p.date.toString().split(',')[1]).reverse());

    onMounted(() => onGetPage(1));
</script>

<template>
    <v-dialog v-model="isFormDisplayed" max-width="50%">
        <v-sheet class="rounded pa-5 mt-10">
            <entity-form
                @submit="_onAdd($event as unknown as Inr)"
                :fields="fields"
                :alias="alias"
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

    <v-row justify="center" class="mt-0">
        <v-col>
            <entity-page-observer
                @change-page="onGetPage($event.newPage)"
                @add="onAdd"
                @delete="onDelete($event.date)"
                :entities="page"
                :max-page="totalPages"
                :id-props="['date']"
                :header-props="['date']"
                :hidden-props="['patientId']"
                :entity-props-alias="alias"
                :is-loading="isPageLoading"
            />
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
                            {{ inrs[inrs.length - 1] }}
                    </v-card-title>

                    <v-sparkline
                        :gradient="['#f72047', '#ffd200', '#1feaea']"
                        :line-width="1"
                        :model-value="inrs"
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
</template>