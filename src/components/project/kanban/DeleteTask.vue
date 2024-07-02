<template>
    <Button 
        @click="openDialog"
        icon="pi pi-trash" 
        severity="danger" 
        v-tooltip.bottom="{
            value: 'Delete task',
        }"
    />
    <Dialog v-model:visible="isDialogVisible" :style="{width: '450px'}" header="Delete task" :modal="true">
        <Card v-if="task" style="overflow: hidden">
            <template #title>
                 <div class="flex gap-4"> 
                    <span>{{ task.name }}</span> 
                    <TaskStatus :status="task.status"/>
                </div>  
            </template>
            <template #content>
                <div  class="mt-4 flex flex-column gap-4">
                    <div class="flex flex-column gap-2">
                        <span class="text-lg font-medium">Assigned employee</span>
                        <div v-if="task.employee"  class="flex align-items-center gap-2">
                            <EmployeeAvatar :photo="task.employee.photo" />
                            <div class="flex flex-column gap-1">
                                <span class="font-semibold text-sm">{{ task.employee.firstName }} {{ task.employee.lastName }}</span>
                                <span class="text-sm">{{ task.employee.jobPosition }}</span>
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
            <Button @click="closeDialog"  severity="secondary" label="Cancel" text />
            <Button label="Delete" @click="deleteTask" :loading="deleting" />
        </template>
    </Dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router';
import { useToast } from "primevue/usetoast";
import { useProjectsStore } from '@/stores/projects.js'
import EmployeeAvatar from '@/components/UI/EmployeeAvatar.vue'
import TaskStatus from '@/components/UI/TaskStatus.vue';

const props = defineProps({
    task: {
        type: Object,
        required: true
    },
})
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
        closeDialog()
    })
}

</script>