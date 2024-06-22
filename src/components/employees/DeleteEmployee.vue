<template>
    <Button @click="openDialog" label="Delete" icon="pi pi-trash" severity="danger" :disabled="isDisabled" />
    <Dialog v-model:visible="isDialogVisible" :style="{width: '450px'}" header="Delete employee" :modal="true">
        <Card style="overflow: hidden">
            <template #title>{{ employee.firstName }}  {{ employee.lastName }}</template>
            <template #subtitle>{{ employee.jobPosition }}</template>
            <template #content>
                <div class="flex justify-content-between">
                    <div class="flex gap-2">
                        <i class="pi pi-phone"></i>
                        <span>{{ employee.phone }}</span> 
                    </div>
                    <div class="flex gap-2">
                        <i class="pi pi-envelope"></i>
                        <span>{{ employee.email }}</span> 
                    </div>
                </div>
            </template>
        </Card>
        <template #footer>
            <Button @click="closeDialog" label="Cancel" text />
            <Button label="Delete" @click="deleteEmployee" :loading="deleting" />
        </template>
    </Dialog> 
    <Toast />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from "primevue/usetoast";
import { useEmployeesStore } from '@/stores/employees.js'

const props = defineProps({
    employee: {
        type: Object,
        required: true
    },
    isDisabled: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits('setSelectedEmployeeToNull')

const employeesStore = useEmployeesStore()

const deleting = computed(() => {
    return employeesStore.pending
}) 

const isDialogVisible = ref(false)

const openDialog = () => {
    isDialogVisible.value = true
}

const closeDialog = () => {
    isDialogVisible.value = false
}

const toast = useToast();

const deleteEmployee = () => {
    employeesStore.deleteEmployee(props.employee.id)
    .then(data => {
        toast.add({ severity: 'success', summary: 'Deleting an employee', detail: data, life: 3000 });
    }).catch(error => {
        toast.add({ severity: 'error', summary: 'Deleting an employee', detail: error, life: 3000 });
    }).finally(() => {
        emit('setSelectedEmployeeToNull')
        closeDialog()
    })
}

</script>