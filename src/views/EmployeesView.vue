<template>
    <div class="card"><div class="font-medium text-2xl">Employees</div></div>
    <div class="card">
        <Toolbar class="mb-4">
            <template #start>
                <AddEmployee @setSelectedEmployeeToNull="setSelectedEmployeeToNull" />
                <EditEmployee @setSelectedEmployeeToNull="setSelectedEmployeeToNull" :employee="selectedEmployee" :is-disabled="isEditButtonDisabled" />
            </template>
            <template #end>
                <DeleteEmployee @setSelectedEmployeeToNull="setSelectedEmployeeToNull" :employee="selectedEmployee" :is-disabled="isDeleteButtonDisabled" />
            </template>
        </Toolbar>
        <DataTable v-model:selection="selectedEmployee" :value="employees" paginator :rows="5" selectionMode="single" :metaKeySelection="true" dataKey="id" tableStyle="min-width: 50rem">
            <template #empty>
                <div>No data to display</div>
            </template>
            <Column header="#" headerStyle="width:3rem">
                <template #body="slotProps">
                    {{ slotProps.index + 1 }}
                </template>
            </Column>
            <Column header="" field="photo">
                <template #body="slotProps">
                    <EmployeeAvatar :photo="slotProps.data.photo" size="large"/>
                </template>
            </Column>
            <Column field="firstName" header="First Name"></Column>
            <Column field="lastName" header="Last Name"></Column>
            <Column field="jobPosition" header="Job Position"></Column>
            <Column field="phone" header="Phone"></Column>
            <Column field="email" header="Email"></Column>
            <Column header="Project manager">
                <template #body="slotProps">
                    <i v-if="employeesStore.isProjectManager(slotProps.data)" class="pi pi-check"></i>
                    <i v-else class="pi pi-times"></i>
                </template>
            </Column>
            <Column header="Team leader">
                <template #body="slotProps">
                    <i v-if="employeesStore.isTeamLeader(slotProps.data)" class="pi pi-check"></i>
                    <i v-else class="pi pi-times"></i>
                </template>
            </Column>
        </DataTable>
    </div>  
</template>

<script setup>
import { useEmployeesStore } from '@/stores/employees.js'
import { ref,computed } from 'vue'
import AddEmployee from '@/components/employees/AddEmployee.vue';
import EditEmployee from '@/components/employees/EditEmployee.vue'
import DeleteEmployee from '@/components/employees/DeleteEmployee.vue'
import EmployeeAvatar from '@/components/UI/EmployeeAvatar.vue';

const employeesStore = useEmployeesStore()
const employees = employeesStore.employees

const selectedEmployee = ref(null)

const isEditButtonDisabled = computed(() => {
    return !selectedEmployee.value
})

const isDeleteButtonDisabled = computed(() => {
    return !selectedEmployee.value
})

const setSelectedEmployeeToNull = () => {
    selectedEmployee.value = null
}
</script>