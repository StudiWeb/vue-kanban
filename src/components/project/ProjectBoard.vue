<template>
<div>
    <div class="grid h-full">
        <KanbanCard class="col-3" title="Backlog" :tasks="backlogTasks" status="backlog" />
        <KanbanCard class="col-3" title="Doing" :tasks="doingTasks" status="doing" />
        <KanbanCard class="col-3" title="Review" :tasks="reviewTasks" status="review" />
        <KanbanCard class="col-3" title="Done" :tasks="doneTasks" status="done" />
    </div>
    <div class="p-2">
        <ProgressBar :value="progres"></ProgressBar>
    </div>
</div>
</template>

<script setup>
import { ref,computed, onMounted } from 'vue'
import { useProjectsStore } from '@/stores/projects';
import { useRoute } from 'vue-router';
import KanbanCard from '@/components/project/kanban/KanbanCard.vue'

const route = useRoute()
const projectStore = useProjectsStore()
const projectId = ref(null)
const tasks = ref([])

onMounted(() => {
    projectId.value = route.params.id
    tasks.value = projectStore.getTasks(projectId.value)
})

const backlogTasks = computed(() => {
    return tasks.value.filter(t => t.status === 'backlog')
})

const doingTasks = computed(() => {
    return tasks.value.filter(t => t.status === 'doing')
})

const reviewTasks = computed(() => {
    return tasks.value.filter(t => t.status === 'review')
})

const doneTasks = computed(() => {
    return tasks.value.filter(t => t.status === 'done')
})

const progres = computed(() => {
   return Math.floor((doneTasks.value.length / (backlogTasks.value.length + doingTasks.value.length + reviewTasks.value.length )) * 100)
})

</script>