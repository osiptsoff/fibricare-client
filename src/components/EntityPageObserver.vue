<script setup lang="ts">
    import EntityObserver from './EntityObserver.vue';
    import PageController from './PageController.vue';

    const props = defineProps<{
        entities: Array<object>,
        idProps: Array<string>,
        maxPage: number,
        isLoading?: boolean,
        entityPropsAlias?: {[key : string] : string},
        hiddenProps?: Array<string>,
        headerProps?: Array<string>,
    }>();
    const emit = defineEmits<{
        add: [void],
        delete: [object],
        update: [object],
        expand: [object],
        changePage: [{newPage: number}]
    }>();

    const getId = (entity: object) => {
        const entries = Object.entries(entity)
            .filter( (e) => props.idProps.includes(e[0]) );
        return Object.fromEntries(entries);
    };
</script>

<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="9">
                <v-btn
                    @click.prevent="emit('add')"
                    :loading="isLoading"
                    class="rounded"
                    block
                    icon="mdi-plus"
                />
            </v-col>
        </v-row>

        <v-row  
            v-for="entity in entities"
            :key="getId(entity).toString()"
            justify="center"
        >
            <v-col cols="9">
                <entity-observer
                    @delete="emit('delete', getId(entity))"
                    @update="emit('update', getId(entity))"
                    @expand="emit('expand', getId(entity))"
                    :entity="entity"
                    :entity-props-alias="entityPropsAlias"
                    :hidden-props="hiddenProps"
                    :header-props="headerProps"
                    :is-loading="isLoading"     
                />
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col cols="9">
                <page-controller
                    @page-changed="emit('changePage', {newPage: $event.newPage})"
                    :start-page="1"
                    :max-page="isLoading ? 1 : maxPage"
                />
            </v-col>
        </v-row>
    </v-container>
</template>