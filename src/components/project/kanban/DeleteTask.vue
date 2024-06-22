<template>
    <Button 
        @click="openDialog"
        icon="pi pi-trash" 
        severity="danger" 
        v-tooltip.bottom="{
            value: 'Delete task',
        }"
    />
    <Dialog v-model:visible="isDialogVisible" modal header="Edit Profile" :style="{ width: '25rem' }">
        <template #header>
            <div class="inline-flex align-items-center justify-content-center gap-2">
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                <span class="font-bold white-space-nowrap">Amy Elsner</span>
            </div>
        </template>
        <span class="p-text-secondary block mb-5">Update your information.</span>
        <div class="flex align-items-center gap-3 mb-3">
            <label for="username" class="font-semibold w-6rem">Username</label>
            <InputText id="username" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex align-items-center gap-3 mb-2">
            <label for="email" class="font-semibold w-6rem">Email</label>
            <InputText id="email" class="flex-auto" autocomplete="off" />
        </div>
        <template #footer>
            <Button @click="closeDialog" label="Cancel" text severity="secondary" autofocus />
            <Button label="Save" outlined severity="secondary" autofocus />
        </template>
    </Dialog>
</template>

<script setup>
import { ref } from 'vue';

const isDialogVisible = ref(false)
const openDialog = () => {
    isDialogVisible.value = true
}
const closeDialog = () => {
    isDialogVisible.value = false
}
</script>