<script setup lang="ts">
    import { ref } from 'vue';

    const props = withDefaults(defineProps<{
        startPage: number,
        maxPage: number,
    }>(), {
        startPage: 1
    });
    const emit = defineEmits<{
        pageChanged: [{newPage: number}]
    }>();

    const pageNumber = ref<number>(props.startPage);
    const pageNumberFieldModel = ref<number>(props.startPage);
    const changePage = (newPage: number) => {
        if(newPage < 1) {
            newPage = 1;
        }
        if(newPage > props.maxPage) {
            newPage = props.maxPage;
        }

        if(newPage === pageNumber.value) {
            return;
        }

        pageNumber.value = newPage;
        pageNumberFieldModel.value = newPage;

        emit('pageChanged', {newPage: pageNumber.value});
    }
</script>

<template>
    <v-card class="rounded">
        <v-row align="center">
            <v-col cols="3">
                <v-btn
                    @click="changePage(pageNumber - 1)"
                    :disabled="pageNumber <= 1"
                    block
                    icon="mdi-arrow-left"
                    class="rounded"
                />
            </v-col>
            
            <v-col>
                <v-row justify="center" align="center">
                    <v-col cols="4" class="text-center">
                        <v-label
                            text="Страница"
                        />
                    </v-col>
                    <v-col cols="4">
                        <v-text-field class="centered-input"
                            v-model="pageNumberFieldModel"
                            @change="changePage(pageNumberFieldModel)"
                            :hide-details="true"
                            :flat="true"
                            :hide-spin-buttons="true"
                            variant="solo"
                            density="compact"
                            type="number"
                        />
                    </v-col>
                    <v-col cols="4" class="text-center">
                        <v-label 
                            :text="'из ' + maxPage"
                        />
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="3">
                <v-btn
                    @click="changePage(pageNumber + 1)"
                    :disabled="pageNumber >= maxPage"
                    block
                    icon="mdi-arrow-right"
                    class="rounded"
                />
            </v-col>
        </v-row>
    </v-card>
</template>

<style scoped>
    .centered-input :deep(input) {
      text-align: center
    }
</style>