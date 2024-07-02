<template>
    <Card v-if="project" class="p-4">
        <template #title>{{ project.name }}</template>
        <template #content>
        <div class="flex flex-column gap-4">
            <div>
                <div class="flex gap-1 surface-100 border-round p-2">
                    <EmployeeAvatar :photo="project.projectManager.photo" size="large"/>
                    <div class="flex flex-column gap-1">
                        <span class="font-semibold">Project Manager</span>
                        <span>{{ project.projectManager.firstName }} {{ project.projectManager.lastName }}</span>
                    </div>
                </div>
                <div class="flex gap-1 surface-100 border-round p-2">
                    <EmployeeAvatar :photo="project.team.teamLeader.photo" size="large"/>
                    <div class="flex flex-column gap-1">
                        <span class="font-semibold">Team Leader</span>
                        <span>{{ project.team.teamLeader.firstName }} {{ project.team.teamLeader.lastName }}</span>
                    </div>
                </div>
            </div>
            <DataTable :value="project.team.teamMembers" :metaKeySelection="true" dataKey="id" tableStyle="min-width: 50rem">
                <template #header>
                    <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                        <span class="text-lg text-900 font-bold">Team members</span>
                    </div>
                </template>
                <Column header="#" headerStyle="width:3rem">
                    <template #body="slotProps">
                        {{ slotProps.index + 1 }}
                    </template>
                </Column>
                <Column headerStyle="width:3rem">
                    <template #body="slotProps">
                        <EmployeeAvatar :photo="slotProps.data.photo" size="large"/>
                    </template>
                </Column>
                <Column field="firstName" header="First name"></Column>
                <Column field="lastName" header="Last name"></Column>
                <Column field="jobPosition" header="Job position"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="phone" header="phone"></Column>
            </DataTable>
        </div>
        </template>
    </Card>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProjectsStore } from '@/stores/projects'
import EmployeeAvatar from '@/components/UI/EmployeeAvatar.vue'

const route = useRoute()
const projectStore= useProjectsStore()
const project = ref(null)

onMounted(() => {
   project.value = projectStore.getProject(route.params.id)
})
</script>