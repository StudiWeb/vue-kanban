<template>
    <Button @click="toggleDialog" label="New" icon="pi pi-plus" severity="success" class="mr-2" />
    <Dialog v-model:visible="isDialogVisible" :style="{width: '900px'}" header="Add team" :modal="true">
        <div class="py-2 flex flex-column gap-4">
            <div class="flex flex-column gap-2">
                <label for="teamName">Team name</label>
                <InputText id="teamName" v-model="value" />
            </div>
            <div class="flex flex-column gap-2">
                <label for="username">Project Manager</label>
                <Dropdown v-model="selectedProjectManager" :options="projectManagers" placeholder="Select a projet manager" checkmark :highlightOnSelect="false" />
            </div>
            <div class="flex flex-column gap-2">
                <label for="username">Team Leader</label>
                <Dropdown v-model="selectedTeamLeader" :options="projectManagers" placeholder="Select a team leader" checkmark :highlightOnSelect="false" />
            </div>
            <PickList v-model="employees" listStyle="height:342px" dataKey="id">
                <template #sourceheader> Available </template>
                <template #targetheader> Selected </template>
                <template #item="slotProps">
                    <div class="flex flex-wrap p-2 align-items-center gap-3">
                        <span class="inline-flex flex-column">
                            <span class="font-bold">{{ slotProps.item.firstName }} {{ slotProps.item.lastName }}</span>
                            <span class="text-sm">{{  slotProps.item.jobPosition  }}</span>
                        </span>
                    </div>
                </template>
            </PickList>
        </div>
        <template #footer>
            <Button @click="toggleDialog" label="Cancel" text />
            <Button @click="addTeam" label="Add" />
        </template>
    </Dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useEmployeesStore } from '@/stores/employees.js'

const employeesStore = useEmployeesStore()
const employees = ref([employeesStore.employees, []])

const isDialogVisible = ref(false)

const toggleDialog = () => {
    isDialogVisible.value = !isDialogVisible.value
}
</script>