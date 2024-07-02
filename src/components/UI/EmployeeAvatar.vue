<template>
    <div>
        <Avatar v-if="photo" :image="photo" class="mr-2" :size="size" shape="circle" />
        <Avatar v-else icon="pi pi-user" class="mr-2" :size="size" style="background-color: #ece9fc; color: #2a1261" shape="circle" />
    </div>
</template>

<script setup>
const props = defineProps({
    photo : {
        type: String,
    },
    size: {
        type: String,
        validator(value) {
            // The value must match one of these strings
            return ['normal', 'large', 'xlarge'].includes(value)
        },
        default: 'normal'
    }
})
</script>