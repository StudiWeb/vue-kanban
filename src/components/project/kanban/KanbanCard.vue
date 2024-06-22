<template>
    <div>
        <Card class="h-full">
            <template #title>
                <div class="flex align-items-center gap-2">
                    <span>{{ title }}</span> 
                    <Badge :value="numberOfTasks" severity="contrast"></Badge>
                </div>
            </template>
            <template #content>
                <div class="py-4">
                    <ScrollPanel style="width: 100%; height: 320px;">
                        <Accordion>
                            <AccordionTab v-for="task in tasks" :key="task.id" :header="task.name">
                                <div class="flex flex-column gap-4">
                                    <div class="flex gap-2">
                                        <EditEmployee :task-id="task.id" :employee="task.employee" />
                                        <EditDescription :task-id="task.id" :description="task.description" />
                                        <EditStatus :task-id="task.id" :status="task.status" />
                                    </div>
                                    <div class="flex flex-column gap-2">
                                        <span class="font-semibold text-sm">Assigned employee</span>
                                        <div v-if="task.employee" class="flex flex-column surface-100 p-2 border-round">
                                            <span class="font-medium">{{ task.employee.firstName }} {{ task.employee.lastName }}</span>
                                            <span class="text-sm">{{  task.employee.jobPosition  }}</span>
                                        </div>
                                        <div v-else>
                                            <div class="surface-100 p-2 border-round">No employee assigned</div>
                                        </div>
                                    </div>
                                    <div class="flex flex-column gap-2">
                                        <span class="font-semibold text-sm">Description</span>
                                        <div class="border-round surface-100 p-2">
                                            <p class="m-0">{{ task.description }}</p>
                                        </div>
                                </div>
                                </div>
                            </AccordionTab>
                        </Accordion>
                    </ScrollPanel>
                </div>
            </template>
        </Card>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import EditEmployee from '@/components/project/kanban/EditEmployee.vue'
import EditDescription from '@/components/project/kanban/EditDescription.vue';
import EditStatus from '@/components/project/kanban/EditStatus.vue';

const props = defineProps({
    title : {
        type: String,
        required: true
    },

    tasks: {
        type: String,
        required: true
    }
})

const numberOfTasks = computed(() => {
    return  props.tasks.length
})
</script>