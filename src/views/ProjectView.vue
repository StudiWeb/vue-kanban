<template>
    <div class="p-4 max-h-screen">
        <div class="card" v-if="project">
            <Menubar :model="items">
                <template #start>
                    <div class="text-lg font-bold bg-primary p-2 border-round mr-4">{{ project.name }}</div>
                </template>
                <template #item="{ item, props }">
                    <router-link v-if="item.route" v-slot="{ href, navigate }" :to="{name : item.route}" custom>
                        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                            <span :class="item.icon" />
                            <span class="ml-2">{{ item.label }}</span>
                        </a>
                    </router-link>
                    <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                    </a>
                </template>
            </Menubar>
        </div>
        <router-view></router-view>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useProjectsStore } from '@/stores/projects'
import { useRoute } from "vue-router"

const route = useRoute()
const projectStore = useProjectsStore()
const project = ref(null)

onMounted(() => {
    project.value = projectStore.getProject(route.params.id)
})



const items = ref([
    {
        label: 'Board',
        icon: 'pi pi-home',
        route: 'project.show.board'
    },
    {
        label: 'Tasks',
        icon: 'pi pi-home',
        route: 'project.show.tasks'
    },
    {
        label: 'Team',
        icon: 'pi pi-star',
        route: 'project.show.team'
    },
    {
        label: 'About',
        icon: 'pi pi-envelope',
        route: 'project.show.about'
    }
]);
</script>