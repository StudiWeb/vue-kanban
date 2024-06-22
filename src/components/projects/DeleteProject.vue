<template>
    <Button @click="openDialog" label="Delete" icon="pi pi-trash" severity="danger" :disabled="isDisabled" />
    <Dialog v-model:visible="isDialogVisible" header="Delete team" :modal="true">
        <Card style="overflow: hidden" class="my-2">
            <template #title>{{ project.name }}</template>
            <template #content>
                <div class="flex flex-column gap-4">
                    <div>
                        <div class="flex flex-column gap-1 surface-100 p-2">
                        <span class="font-medium">Project Manager</span>
                        <span>{{ project.projectManager.firstName }} {{ project.projectManager.lastName }}</span>
                    </div>
                    <div class="flex flex-column gap-1 surface-50 p-2">
                        <span class="font-medium">Team Leader</span>
                        <span>{{ project.team.teamLeader.firstName }} {{ project.team.teamLeader.lastName }}</span>
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
                        <Column field="firstName" header="First name"></Column>
                        <Column field="lastName" header="Last name"></Column>
                        <Column field="jobPosition" header="Job position"></Column>
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