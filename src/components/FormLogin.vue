<script setup lang="ts">
    import { computed, ref } from 'vue';

    defineProps<{
        loading?: boolean
    }>();
    defineEmits<{
        submit: [{login: string, password: string}]
    }>();

    const fieldNotEmpty = ref<(val: string) => true | string>(
        val => val && val.trim().length > 0 || 'Поле не должно быть пустым'
    );
    const login = ref<string>('');
    const password = ref<string>('');
    const isFormValid = ref<boolean>(false);
    const isPasswordHidden = ref<boolean>(true);
    const passwordFieldType = computed<string>(
        () => isPasswordHidden.value ? 'password' : 'text'
    );
    const passwordFieldHideIcon = computed<string>(
        () => isPasswordHidden.value ? 'mdi-eye' : 'mdi-eye-off'
    );
</script>

<template>
    <v-sheet class="rounded pa-5">
        <slot>
        </slot>
        <v-form
            v-model="isFormValid"
            @submit.prevent="$emit('submit', {login, password})"
        >
            <v-row>
                <v-col>
                    <v-text-field
                        v-model="login"
                        :rules="[fieldNotEmpty]"
                        :readonly="loading"
                        label="Логин"
                        placeholder="Введите логин"
                        clearable
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                        v-model="password"
                        @click:append-inner="isPasswordHidden = !isPasswordHidden"
                        :rules="[fieldNotEmpty]"
                        :readonly="loading"
                        :type="passwordFieldType"
                        :append-inner-icon="passwordFieldHideIcon"
                        label="Пароль"
                        placeholder="Введите пароль"
                        clearable
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
                    Войти
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-sheet>
</template>