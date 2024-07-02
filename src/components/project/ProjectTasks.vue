<template>
    <div class="card"><div class="font-medium text-2xl">Tasks</div></div>
    <div class="card">
        <Toolbar class="mb-4">
            <template #start>
                <AddTask @setSelectedTaskToNull="setSelectedTaskToNull" />
                <EditTask @setSelectedTaskToNull="setSelectedTaskToNull" :task="selectedTask" :is-disabled="isEditButtonDisabled" />
            </template>
            <template #end>
                <DeleteTask @setSelectedTaskToNull="setSelectedTaskToNull" :task="selectedTask" :is-disabled="isDeleteButtonDisabled" />
            </template>
        </Toolbar>
        <DataTable v-model:selection="selectedTask" :value="tasks" paginator :rows="5" selectionMode="single" :metaKeySelection="true" dataKey="id" tableStyle="min-width: 50rem">
            <template #empty>
                <div>No data to display</div>
            </template>
            <Column header="#" headerStyle="width:3rem">
                <template #body="slotProps">
                    {{ slotProps.index + 1 }}
                </template>
            </Column>
            <Column field="name" header="Name">
                <template #body="slotProps">
                    <span class="font-bold">{{ slotProps.data.name }}</span>
                </template>
            </Column>
            <Column field="description" header="Description" headerStyle="width:32rem"></Column>
            <Column field="employee" header="Employee">
                <template #body="slotProps">
                    <div  v-if="slotProps.data.employee" class="flex align-items-center gap-2">
                        <EmployeeAvatar :photo="slotProps.data.employee.photo" />
                        <div class="flex flex-column gap-1">
                            <span class="font-semibold text-sm">{{ slotProps.data.employee.firstName }} {{ slotProps.data.employee.lastName }}</span>
                            <span class="text-sm">{{ slotProps.data.employee.jobPosition }}</span>
                        </div>
                    </div>
                    <div v-else>
                        <span>No employee assigned</span>
                    </div>
                </template>
            </Column>
            <Column field="status" header="Status">
                <template #body="slotProps">
                    <TaskStatus :status="slotProps.data.status" />
                </template> 
            </Column>
        </DataTable>
    </div>  
</template>

<script setup>
import { ref,computed, onMounted } from 'vue'
import { useProjectsStore } from '@/stores/projects'
import { useRoute } from 'vue-router'
import AddTask from '@/components/project/task/AddTask.vue'
import EditTask from '@/components/project/task/EditTask.vue'
import DeleteTask from '@/components/project/task/DeleteTask.vue'
import EmployeeAvatar from '@/components/UI/EmployeeAvatar.vue';
import TaskStatus from '../UI/TaskStatus.vue'

const route = useRoute()
const projectStore = useProjectsStore()
const tasks = ref(null)


onMounted(() => {
    tasks.value = projectStore.getTasks(route.params.id)
})

const selectedTask = ref(null)

const isEditButtonDisabled = computed(() => {
    return !selectedTask.value
})

const isDeleteButtonDisabled = computed(() => {
    return !selectedTask.value
})

const setSelectedTaskToNull = () => {
    selectedTask.value = null
}

</script>