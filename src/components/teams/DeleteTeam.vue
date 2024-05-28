<template>
    <Button @click="openDialog" label="New" icon="pi pi-plus" severity="success" class="mr-2" />
    <Dialog v-model:visible="isDialogVisible" :style="{width: '450px'}" header="Add employee" :modal="true">
        <div class="py-2 flex flex-column gap-4">
            <div class="flex flex-column gap-2">
                <label for="username">Team name</label>
            </div>
            <div class="flex flex-column gap-2">
                <label for="username">Project Manager</label>
            </div>
            <div class="flex flex-column gap-2">
                <label for="username">Team Leader</label>
            </div>
        </div>
        <template #footer>
            <Button @click="closeDialog" label="Cancel" text />
            <Button @click="addEmployee" label="Add" :loading="adding" />
        </template>
    </Dialog>
</template>

<script setup>
import { ref } from 'vue'
</script>