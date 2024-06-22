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
        <DataTable v-model:selection="selectedTask" :value="tasks" selectionMode="single" :metaKeySelection="true" dataKey="id" tableStyle="min-width: 50rem">
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
            <Column field="description" header="Description" headerStyle="width:36rem"></Column>
            <Column field="employee" header="Employee">
                <template #body="slotProps">
                    <div v-if="slotProps.data.employee" class="flex flex-column">
                        <span class="font-bold">{{ slotProps.data.employee.firstName }} {{ slotProps.data.employee.lastName }}</span>
                        <span class="text-sm">{{  slotProps.data.employee.jobPosition  }}</span>
                    </div>
                    <div v-else>
                        <span>No employee assigned</span>
                    </div>
                </template>
            </Column>
            <Column field="status" header="Status">
                <template #body="slotProps">
                    <Badge :value="transformToUpperCase(slotProps.data.status)" :severity="getTaskStatusSeverity(slotProps.data.status)"></Badge>
                </template> 
            </Column>
            <Column header="Details">
                <template #body>
                    <Button icon="pi pi-search" severity="success" rounded aria-label="Search" />
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