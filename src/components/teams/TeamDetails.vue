<template>
    <Button @click="openDialog" icon="pi pi-search" rounded />
    <Dialog v-model:visible="isDialogVisible" :header="team.name" :modal="true">
        <div class="flex flex-column gap-4">
            <div class="flex flex-column gap-1 surface-100 border-round p-2">
                <span class="font-medium">Team Leader</span>
                <span>{{ team.teamLeader.firstName }} {{ team.teamLeader.lastName }}</span>
            </div>
            <DataTable :value="team.teamMembers" :metaKeySelection="true" dataKey="id" tableStyle="min-width: 50rem">
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
        <template #footer>
            <Button @click="closeDialog" label="Close" />
        </template>
    </Dialog>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    team: {
        type: Object,
        required: true
    }
})

const isDialogVisible = ref(false)

const openDialog = () => {
    isDialogVisible.value = true
}

const closeDialog = () => {
    isDialogVisible.value = false
}
</script>