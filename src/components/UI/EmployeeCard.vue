<template>
<Card style="overflow: hidden">
    <template #content>
        <div class="flex flex-column gap-4">
            <div class="flex align-items-center">
                <EmployeeAvatar :photo="photo" size="large" />
                <div class="flex flex-column gap-1">
                    <div class="font-semibold">{{ firstName }} {{ lastName }}</div>
                    <div class="text-base">{{ jobPosition }}</div>
                </div>
            </div>
            <div class="flex justify-content-between">
                <div class="flex gap-2">
                    <i class="pi pi-phone"></i>
                    <span>{{ phone }}</span> 
                </div>
                <div class="flex gap-2">
                    <i class="pi pi-envelope"></i>
                    <span>{{ email }}</span> 
                </div>
            </div>
        </div>
    </template>
</Card>
</template>

<script setup>
import EmployeeAvatar from '@/components/UI/EmployeeAvatar.vue';
const props = defineProps({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    jobPosition: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
})
</script>