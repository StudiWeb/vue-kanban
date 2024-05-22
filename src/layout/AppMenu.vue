<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Menu',
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-id-card', to: {name: 'dashboard'} },
            { label: 'Employees', icon: 'pi pi-fw pi-check-square', to: {name: 'employees'} },
            { label: 'Teams', icon: 'pi pi-fw pi-bookmark', to: {name: 'teams'} },
            { label: 'Projects', icon: 'pi pi-fw pi-bookmark', to: {name: 'projects'} },
        ]
    },
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
