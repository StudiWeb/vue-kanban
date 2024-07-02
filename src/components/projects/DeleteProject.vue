<template>
    <Button @click="openDialog" label="Delete" icon="pi pi-trash" severity="danger" :disabled="isDisabled" />
    <Dialog v-model:visible="isDialogVisible" header="Delete project" :modal="true">
        <Card style="overflow: hidden" class="my-2">
            <template #title>{{ project.name }}</template>
            <template #content>
                <div class="flex flex-column gap-4">
                    <div>
                        <div class="flex flex-column gap-2 surface-100 p-2">
                            <span class="font-medium">Project Manager</span>
                            <div class="flex align-items-center gap-1">
                                <EmployeeAvatar :photo="project.projectManager.photo" size="large"/>
                                <div class="flex flex-column">
                                    <span class="font-bold">{{ project.projectManager.firstName }} {{ project.projectManager.lastName }}</span>
                                    <span class="text-sm">{{ project.projectManager.jobPosition  }}</span>
                                </div>
                            </div>
                        </div>
                    <div class="flex flex-column gap-2 surface-50 p-2">
                        <span class="font-medium">Team Leader</span>
                        <div class="flex align-items-center gap-1">
                                <EmployeeAvatar :photo="project.team.teamLeader.photo" size="large"/>
                                <div class="flex flex-column">
                                    <span class="font-bold">{{ project.team.teamLeader.firstName }} {{ project.team.teamLeader.lastName }}</span>
                                    <span class="text-sm">{{ project.team.teamLeader.jobPosition  }}</span>
                                </div>
                            </div>
                    </div>
                    </div>
                    <DataTable :value="project.team.teamMembers" dataKey="id" tableStyle="min-width: 50rem">
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
                        <Column field="phone" header="Phone"></Column>
                    </DataTable>
                </div>
            </template>
        </Card>
        <template #footer>
            <Button @click="closeDialog" label="Cancel" text />
            <Button label="Delete" @click="deleteProject" :loading="deleting" />
        </template>
    </Dialog> 
    <Toast />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from "primevue/usetoast"
import { useProjectsStore } from '@/stores/projects'
import EmployeeAvatar from '@/components/UI/EmployeeAvatar.vue';

const props = defineProps({
    project: {
        type: Object,
        required: true
    },
    isDisabled: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits(['setSelectedProjectToNull'])

const projectStore = useProjectsStore()

const deleting = computed(() => {
    return projectStore.pending
}) 


const toast = useToast();

const deleteProject = () => {
    projectStore.deleteProject(props.project.id)
    .then(data => {
        toast.add({ severity: 'success', summary: 'Deleting the project', detail: data, life: 3000 });
    }).catch(error => {
        toast.add({ severity: 'error', summary: 'Deleting the project', detail: error, life: 3000 });
    }).finally(() => {
        closeDialog()
        emit('setSelectedProjectToNull')
    })
}

const isDialogVisible = ref(false)
const openDialog = () => {
    isDialogVisible.value = true
}
const closeDialog = () => {
    isDialogVisible.value = false
}

</script>