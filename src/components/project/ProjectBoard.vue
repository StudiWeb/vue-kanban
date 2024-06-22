<template>
    <div class="grid h-full">
        <KanbanCard class="col-3 h-full" title="Backlog" />
        <KanbanCard class="col-3" title="Doing" />
        <KanbanCard class="col-3" title="Review" />
        <KanbanCard class="col-3" title="Done" />
    </div>
</template>

<script setup>
import KanbanCard from '@/components/project/kanban/KanbanCard.vue'
</script>