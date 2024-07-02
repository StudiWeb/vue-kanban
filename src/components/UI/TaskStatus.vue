<template>
    <Badge :value="status.toUpperCase()" :severity="getStatusSeverity(status)"></Badge>
</template>

<script setup>
const props = defineProps({
    status: {
        type: String,
        validator(value, props) {
            // The value must match one of these strings
            return ['backlog', 'doing', 'review','done'].includes(value)
        }
    }
})

const getStatusSeverity = (status) => {
    switch(status) {
        case 'backlog':
            return 'contrast'
        case 'doing':
            return 'warning'
        case 'review':
            return 'info'
        case 'done':
            return 'success'
        default:
            return 'backlog'
    }
}
</script>