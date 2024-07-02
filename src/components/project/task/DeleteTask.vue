<template>
    <Button @click="openDialog" label="Delete" icon="pi pi-trash" severity="danger" :disabled="isDisabled" />
    <Dialog v-model:visible="isDialogVisible" :style="{width: '450px'}" header="Delete task" :modal="true">
        <Card v-if="task" style="overflow: hidden">
            <template #title>
                 <div class="flex gap-4"> 
                    <span>{{ task.name }}</span> 
                    <Badge :value="transformToUpperCase(task.status)" :severity="getTaskStatusSeverity(task.status)"></Badge>
                </div>  
            </template>
            <template #content>
                <div  class="mt-4 flex flex-column gap-4">
                    <div class="flex flex-column gap-2">
                        <span class="text-lg font-medium">Assigned employee</span>
                        <div v-if="task.employee" class="flex align-items-center gap-1 surface-100 p-2 border-round">
                            <EmployeeAvatar :photo="task.employee.photo" />
                            <div class="flex flex-column">
                                <span class="font-medium">{{ task.employee.firstName }} {{ task.employee.lastName }}</span>
                                <span class="text-sm">{{  task.employee.jobPosition  }}</span>
                            </div>
                        </div>
                        <div v-else>
                            <span>No employee assigned</span>
                        </div>
                    </div>
                    <div class="flex flex-column gap-2">
                        <span class="text-lg font-medium">Description</span>
                        <p class="surface-100 p-2 border-round">{{ task.description }}</p>
                    </div>
                </div>
            </template>
        </Card>
        <template #footer>
            <Button @click="closeDialog" label="Cancel" text />
            <Button label="Delete" @click="deleteTask" :loading="deleting" />
        </template>
    </Dialog> 
    <Toast />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router';
import { useToast } from "primevue/usetoast";
import { useProjectsStore } from '@/stores/projects.js'
import EmployeeAvatar from '@/components/UI/EmployeeAvatar.vue';

const props = defineProps({
    task: {
        type: Object,
        required: true
    },
    isDisabled: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits(['setSelectedEmployeeToNull'])
const route = useRoute()
const projectStore = useProjectsStore()

const deleting = computed(() => {
    return projectStore.pending
}) 

const isDialogVisible = ref(false)

const openDialog = () => {
    isDialogVisible.value = true
}

const closeDialog = () => {
    isDialogVisible.value = false
}

const toast = useToast();

const deleteTask = () => {
    const projectId = route.params.id  
    projectStore.deleteTask(projectId,props.task.id)
    .then(data => {
        toast.add({ severity: 'success', summary: 'Deleting an employee', detail: data, life: 3000 });
    }).catch(error => {
        toast.add({ severity: 'error', summary: 'Deleting an employee', detail: error, life: 3000 });
    }).finally(() => {
        emit('setSelectedEmployeeToNull')
        closeDialog()
    })
}

const transformToUpperCase = (text) => {
    return text.toUpperCase()
}

const getTaskStatusSeverity = (status) => {
    switch (status) {
    case 'backlog':
        return 'contrast'
    case 'doing':
        return 'warning'
    case 'review':
        return 'secondary'
    case 'done':
        return 'info'
    default:
        return 'contrast'
    }
}

</script>