<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppMenuItem from './AppMenuItem.vue';
import { useProjectsStore } from '@/stores/projects'

const route = useRoute()
const projectStore = useProjectsStore()

const projectName = computed(() => {
    const project = projectStore.getProject(route.params.id)
    return project ? project.name : 'Project' 
})

const model = computed(() => {
    //menu for project
    if(route.params.id) {
        return [{
                label: projectName.value,
                items: [            {
                    label: 'Board',
                    icon: 'pi pi-home',
                    to: {name: 'project.show.board'} 
                },
                {
                    label: 'Tasks',
                    icon: 'pi pi-list',
                    to: {name: 'project.show.tasks'}
                },
                {
                    label: 'Team',
                    icon: 'pi pi-users',
                    to: {name: 'project.show.team'}
                }]
            }
        ]
    } else {
        //base menu
        return [
            {
                label: 'Menu',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: {name: 'dashboard'} },
                    { label: 'Employees', icon: 'pi pi-fw pi-user', to: {name: 'employees'} },
                    { label: 'Teams', icon: 'pi pi-fw pi-users', to: {name: 'teams'} },
                    { label: 'Projects', icon: 'pi pi-fw pi-star', to: {name: 'projects'} },
                ]
            },
        ]
    }
})
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
