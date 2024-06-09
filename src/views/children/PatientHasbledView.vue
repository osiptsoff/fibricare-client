<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
import EntityForm from '../../components/EntityForm.vue';
import EntityObserver from '../../components/EntityObserver.vue';
import useHasBled from '../../hooks/useHasBled';
import Hasbled, { alias, fields } from '../../models/HasBled';
import { useActiveDoctorStore } from '../../stores/activeDoctorStore';

    const { selectedPatient } = useActiveDoctorStore();
    const { create, update, get, remove, calculate, generateDummy, nonExistentMessage } = useHasBled();

    const error = ref<string>();
    const isErrorCritical = computed<boolean>(
        () => error.value !== nonExistentMessage
    );
    const scale = ref<Hasbled>();
    const scaleValue = ref<number>();
    const isFormDisplayed = ref<boolean>(false);
    const isConfirmDialogDisplayed = ref<boolean>(false);

    const onGetScale = async () => {
        const resScale = await get(selectedPatient.value?.id || -1);

        if(typeof resScale === 'string') {
            error.value = resScale;
            return;
        }

        error.value = undefined;
        scale.value = resScale;
    }
    const onCalculateScale = async () => {
        const res = await calculate(selectedPatient.value?.id || -1,
            selectedPatient.value?.birthDate
        );

        if(typeof res === 'string') {
            error.value = res;
            return;
        }

        error.value = undefined;
        scaleValue.value = res;
    }
    const onAdd = async () => {
        const obj = generateDummy();
        obj.patientId = selectedPatient.value?.id || -1;
        const result = await create(obj);

        if(typeof result === 'string') {
            error.value = result;
            return;
        } 

        scale.value = result;
        error.value = undefined;
        onCalculateScale();
    };
    const onUpdate = async (newVal: Hasbled) => {
        scale.value = newVal;
        const result = await update(selectedPatient.value?.id || -1, scale.value as Hasbled);

        if(typeof result === 'string') {
            error.value = result;
            return;
        }

        await onCalculateScale();

        scale.value = result;
        error.value = undefined;
        isFormDisplayed.value = false;
    };
    const onDelete = async () => {
        const result = await remove(selectedPatient.value?.id || -1);

        if(typeof result === 'string') {
            error.value = result;
            return;
        }

        scale.value = undefined;
        scaleValue.value = undefined;
        error.value = nonExistentMessage;
        isConfirmDialogDisplayed.value = false;
    };

    onMounted(async () => {
        await onGetScale();
        if(!!scale.value) {
            await onCalculateScale();
        }
    });
</script>

<template>
    <v-dialog v-model="isFormDisplayed" max-width="50%">
        <v-sheet class="rounded pa-5 mt-10">
            <entity-form
                @submit="onUpdate($event as unknown as Hasbled)"
                :fields="fields"
                :alias="alias"
                :defaults="scale"
            >
                <v-card
                        v-show="!!error"
                        class="mx-auto mb-5 text-center"
                        color="error"
                        variant="tonal"
                    >
                        <v-card-title>
                            {{ error }}
                        </v-card-title>
                </v-card>
            </entity-form>
        </v-sheet>
    </v-dialog>

    <v-dialog v-model="isConfirmDialogDisplayed" max-width="50%">
        <v-card
            class="rounded pa-5 mt-10"
            prepend-icon="mdi-exclamation-thick"
            title="Удалить данные о шкале?"
            text="Вы действительно хотите удалить данные о шкале?
                    Отменить действие будет невозможно."
        >
            <template v-slot:actions>
                <v-spacer></v-spacer>

                <v-btn @click="onDelete">
                    Удалить
                </v-btn>
            </template>
        </v-card>
    </v-dialog>

    <template v-if="!!error">
        <v-card
            v-if="isErrorCritical"
            class="mx-auto mb-5 text-center"
            color="error"
            variant="tonal"
        >
            <v-card-title>
                {{ error }}
            </v-card-title>
        </v-card>
        
        <v-row v-else
            class="mt-0"
        >
            <v-col>
                <v-btn
                    @click.prevent="onAdd"
                    class="rounded"
                    block
                    icon="mdi-plus"
                />
            </v-col>
        </v-row>
    </template>

    <v-container 
        v-else
        class="mt-2 pa-0"
    >
        <v-row class="">
            <v-col>
                <entity-observer
                    @delete="isConfirmDialogDisplayed = true"
                    @update="isFormDisplayed = true"
                    :entity="scale || {}"
                    :entity-props-alias="alias"
                    :hidden-props="['patientId']"
                />
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-card class="text-center">
                    <v-card-title>
                        Значение шкалы
                    </v-card-title>
                    <v-card-text>
                        {{ scaleValue }}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>