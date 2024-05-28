<script setup lang="ts">
    import { computed, onMounted, ref, watch } from 'vue';

    const props = defineProps<{
        entity: object,
        entityPropsAlias?: {[key : string] : string},
        hiddenProps?: Array<string>,
        headerProps?: Array<string>,
        isLoading?: boolean,
    }>();
    const emit = defineEmits<{
        delete: [void],
        update: [void],
        expand: [{isExpanded: boolean}],
    }>();

    const isExpanded = ref<boolean>(false);
    const expandIcon = computed<string>(
        () => isExpanded.value === true ? 'mdi-arrow-expand-up' : 'mdi-arrow-expand-down'
    );
    const onExpand = () => {
        isExpanded.value = !isExpanded.value;
        emit('expand', {isExpanded: isExpanded.value});
    };

    const entries = ref<Array<{key: string, value: string}>>();
    const header = ref<string>();
    const objectToEntries = (obj: object) => {
        const allEntries = Object.entries(obj).map(
            (e) => ({key: e[0], value: e[1] ? e[1].toString() : 'Отсутствует'})
        );

        entries.value = allEntries.filter(
            (e) => !props.hiddenProps?.includes(e.key)
        );
        header.value = allEntries
            .filter((e) => props.headerProps?.includes(e.key))
            .map(e => e.value)
            .join(', ');
    };
    const getPropKeyName = (key: string) => {
        if(!props.entityPropsAlias) {
            return key;
        }

        return props.entityPropsAlias[key] || key;
    }

    watch(() => props.entity, (newEntity) => objectToEntries(newEntity));
    onMounted(() => objectToEntries(props.entity))
</script>

<template>
    <v-card :loading="isLoading" class="rounded">
        <v-row justify="center">
            <v-col cols="11">
                <v-card-title class="text-center">
                    {{ header }}
                </v-card-title>
            </v-col>
        </v-row>

        <v-divider/>

        <v-expand-transition>
            <v-row 
                v-if="isExpanded && !isLoading"
                justify="center"
            >
                <v-col cols="10">
                    <v-card-text class="text-center">
                        <v-table density="compact">
                            <tbody>
                                <tr
                                    v-for="entry in entries"
                                    :key="entry.key"
                                >
                                    <td>{{ getPropKeyName(entry.key) }}</td>
                                    <td>{{ entry.value }}</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-col>
            </v-row>
        </v-expand-transition>

        <v-card-actions>
            <v-row justify="center">
                <v-col cols="1">
                    <v-btn
                        @click.prevent="emit('delete')"
                        :loading="isLoading"
                        class="rounded"
                        block
                        icon="mdi-minus"
                    />
                </v-col>

                <v-col cols="1">
                    <v-btn
                        @click.prevent="onExpand"
                        :loading="isLoading"
                        class="rounded"
                        block
                        :icon="expandIcon"
                    />
                </v-col>

                <v-col cols=1>
                    <v-btn 
                        @click.prevent="emit('update')"
                        :loading="isLoading"
                        class="rounded"
                        block
                        icon="mdi-pencil"
                    />
                </v-col>
            </v-row>
        </v-card-actions>
    </v-card>
</template>