<template>
    <Button @click="openDialog" label="Delete" icon="pi pi-trash" severity="danger" :disabled="isDisabled" />
    <Dialog v-model:visible="isDialogVisible" :style="{width: '450px'}" header="Delete employee" :modal="true">
        <EmployeeCard 
            :first-name="employee.firstName"
            :last-name="employee.lastName"
            :job-position="employee.jobPosition"
            :phone="employee.phone"
            :email="employee.email"
            :photo="employee.photo"
        />
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
import EmployeeCard from '@/components/UI/EmployeeCard.vue';

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