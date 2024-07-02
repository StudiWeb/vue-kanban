<template>
    <div class="card"><div class="font-medium text-2xl">Dashboard</div></div>
    <div class="card">
        <div class="grid">
            <DasboardCard class="col-12 lg:col-6 xl:col-4" title="Employees" :number="numberOfEmployees" />
            <DasboardCard class="col-12 lg:col-6 xl:col-4" title="Teams" :number="numberOfTeams" />
            <DasboardCard class="col-12 lg:col-6 xl:col-4" title="Projects" :number="numberOfProjects" />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useEmployeesStore } from '@/stores/employees'
import { useTeamsStore } from '@/stores/teams'
import { useProjectsStore } from '@/stores/projects'
import DasboardCard from '@/components/dashboard/DasboardCard.vue';

const employeesStore = useEmployeesStore()
const teamsStore = useTeamsStore()
const projectsStore = useProjectsStore()

const numberOfEmployees = computed(() => {
    return employeesStore.employees.length
})

const numberOfTeams = computed(() => {
    return teamsStore.teams.length
})

const numberOfProjects = computed(() => {
    return projectsStore.projects.length
})
</script>