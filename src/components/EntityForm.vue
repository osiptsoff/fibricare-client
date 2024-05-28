<script setup lang="ts">
    import { onMounted, ref } from 'vue';

    interface Field {
        fieldName: string,
        fieldType: 'string' | 'number' | 'boolean',
        validator?: (val: string) => true | string,
    };

    const props = defineProps<{
        fields: Array<Field>,
        defaults?: { [fieldName: string]: any },
        alias?: { [fieldName: string]: any },
        loading?: boolean,
    }>();
    const emit = defineEmits<{
        submit: [ { [fieldName: string]: string | boolean | number } ],
    }>();

    const isNotEmpty = ref<(val: string | number) => true | string>(
        val => !!val && val.toString().trim().length > 0 || 'Поле не должно быть пустым'
    );
    const isFormValid = ref<boolean>(false);
    const data = ref<{ [fieldName: string]: any }>({});
    
    const getFieldName = (key: string) => {
        if(!props.alias) {
            return key;
        }

        return props.alias[key] || key;
    };
    const getFieldRules = (field: Field) => {
        if(field.validator) {
            return [isNotEmpty.value, field.validator];
        }
        return [isNotEmpty.value];
    };
    const onSubmit = () => {
        emit('submit', data.value);
    };

    onMounted(() => {
        if(!props.defaults) {
            return;
        }
        Object.entries(props.defaults).forEach(e => data.value[e[0]] = e[1]);
    });
</script>

<template>
    <slot>
    </slot>
    <v-form
        @submit.prevent="onSubmit"
        v-model="isFormValid"
    >
        <v-row 
            v-for="field in fields"
            :key="field.fieldName"
            justify="center"
        >
            <v-col cols="10">
                <v-checkbox
                    v-model="data[field.fieldName]"
                    v-if="field.fieldType==='boolean'"
                    :label="getFieldName(field.fieldName)"
                />
                <v-text-field
                    v-model="data[field.fieldName]"
                    v-else
                    :rules="getFieldRules(field)"
                    :type="field.fieldType"
                    :hide-spin-buttons="true"
                    :readonly="loading"
                    :label="getFieldName(field.fieldName)"
                />
            </v-col>
        </v-row>

        <v-row class="justify-center">
            <v-col cols="5">
                <v-btn
                    :disabled="!isFormValid"
                    :loading="loading"
                    type="submit"
                    block
                >
                    Отправить
                </v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>