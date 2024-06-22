<template>
    <div>
        <Card class="h-full">
            <template #title>{{ title }}</template>
            <template #content>
                <div class="py-4">
                    <ScrollPanel style="width: 100%; max-height: 480px;">
                        <Accordion>
                            <AccordionTab v-for="tab in tabs" :key="tab.title" :header="tab.title">
                                <p class="m-0">{{ tab.content }}</p>
                            </AccordionTab>
                        </Accordion>
                    </ScrollPanel>
                </div>
            </template>
        </Card>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    title : {
        type: String,
        required: true
    }
})

const tabs = ref([
    { title: 'Title 1', content: 'Content 1' },
    { title: 'Title 2', content: 'Content 2' },
    { title: 'Title 3', content: 'Content 3' },
]);
</script>