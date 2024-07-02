<template>
    <div class="card">
        <div class="font-medium text-2xl">Projects</div>
    </div>
    <div class="card">
        <Toolbar class="mb-4">
            <template #start>
                <AddProject @set-selected-project-to-null="setSelectedProjectToNull" />
                <EditProject :project="selectedProject" :is-disabled="isEditButtonDisabled" @set-selected-project-to-null="setSelectedProjectToNull" />
            </template>
            <template #end>
                <DeleteProject :project="selectedProject" :is-disabled="isDeleteButtonDisabled" @set-selected-project-to-null="setSelectedProjectToNull" />
            </template>
        </Toolbar>
        <DataTable v-model:selection="selectedProject" :value="projects" paginator :rows="5" selectionMode="single" :metaKeySelection="true" dataKey="id" tableStyle="min-width: 50rem">
            <template #empty>
                <div>No data to display</div>
            </template>
            <Column header="#" headerStyle="width:3rem">
                <template #body="slotProps">
                    {{ slotProps.index + 1 }}
                </template>
            </Column>
            <Column field="name" header="Name"></Column>
            <Column field="projectManager" header="Project manager">
                <template #body="slotProps">
                    <div class="flex align-items-center gap-1">
                        <EmployeeAvatar :photo="slotProps.data.projectManager.photo" size="large"/>
                        <div class="flex flex-column">
                            <span class="font-bold">{{ slotProps.data.projectManager.firstName }} {{ slotProps.data.projectManager.lastName }}</span>
                            <span class="text-sm">{{  slotProps.data.projectManager.jobPosition  }}</span>
                        </div>
                    </div>
                </template>
            </Column>
            <Column field="team" header="Team">
                <template #body="slotProps">
                    <TeamDetails :team="slotProps.data.team" />
                </template>
            </Column>
            <Column>
                <template #body="slotProps">
                    <Button label="Manage" rounded @click="navigateToProject(slotProps.data.id)" />
                </template>
            </Column>
        </DataTable>
        <FullscreenLoader :loading="navigating" />
    </div>
</template>

<script setup>
import { ref,computed } from 'vue'
import { useProjectsStore } from '@/stores/projects';
import { useRouter } from 'vue-router';
import AddProject from '@/components/projects/AddProject.vue'
import EditProject from '@/components/projects/EditProject.vue';
import DeleteProject from '@/components/projects/DeleteProject.vue';
import TeamDetails from '@/components/teams/TeamDetails.vue';
import EmployeeAvatar from '@/components/UI/EmployeeAvatar.vue';
import FullscreenLoader from '@/components/UI/FullscreenLoader.vue';

const projectsStore = useProjectsStore()
const selectedProject = ref(null)
const projects = computed(() => {
    return projectsStore.projects
})
const isEditButtonDisabled = computed(() => {
    return !selectedProject.value
})

const isDeleteButtonDisabled = computed(() => {
    return !selectedProject.value
})
const setSelectedProjectToNull = () => {
    selectedProject.value = null
}

const router = useRouter()
const navigating = ref(false)
const navigateToProject = (id) => {
    navigating.value = true
    setTimeout(() => {
        router.push({name: 'project.show.board', params: {id: id}})
        navigating.value = false
    },1500)
}
</script>