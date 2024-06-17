<template>
    <div>
        <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
            <div>
                <span class="block text-500 font-medium mb-3">{{ title }}</span>
                <div class="text-900 font-bold text-4xl">{{ number }}</div>
            </div>
            <div class="flex align-items-center justify-content-center border-round bg-green-100" style="width: 2.5rem; height: 2.5rem">
                <i v-if="title === 'Employees'" class="pi pi-user text-green-500 text-xl"></i>
                <i v-if="title === 'Teams'" class="pi pi-users text-green-500 text-xl"></i>
                <i v-if="title === 'Projects'" class="pi pi-sitemap text-green-500 text-xl"></i>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }
})
</script>