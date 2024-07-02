<template>
    <div v-if="loading" class="h-screen absolute p-dialog-mask p-component-overlay flex justify-content-center align-items-center" style="z-index: 1000;">
        <div class="flex flex-column align-items-center">
            <ProgressSpinner />
            <span class="text-white font-medium">Loading...</span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    }
})
</script>