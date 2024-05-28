<script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { Auth, authenticate } from '../hooks/useAuth';
    import FormLogin from '../components/FormLogin.vue';

    const router = useRouter();
    
    const errorText = ref<string>();
    const isFormLoading = ref<boolean>(false);

    const onSubmit = async (data: Auth) => {
        errorText.value = '';
        isFormLoading.value = true;
        
        const result = await authenticate(data);
        if(!!result) {
            errorText.value = result;
        } else {
            router.replace({name: 'home'});
        }

        isFormLoading.value = false;
    }
</script>

<template>
    <v-container
        fluid
        class="fill-height"
    >
        <v-row class="justify-center">
            <v-col cols="6">
                <form-login
                    @submit="onSubmit"
                    :loading="isFormLoading"
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
                </form-login>
            </v-col>
        </v-row>
    </v-container>
</template>