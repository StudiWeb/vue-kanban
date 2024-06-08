<template>
    <div class="card"><div class="font-medium text-2xl">Teams</div></div>
    <div class="card">
        <Toolbar class="mb-4">
            <template #start>
                <AddTeam />
                <EditTeam :team="selectedTeam" :is-disabled="isButtonDisabled" @set-selected-team-to-null="setSelectedTeamToNull" />
            </template>
            <template #end>
                <DeleteTeam :team="selectedTeam" :is-disabled="isButtonDisabled" />
            </template>
        </Toolbar>
        <DataTable v-model:selection="selectedTeam" :value="teams" selectionMode="single" :metaKeySelection="true" dataKey="id" tableStyle="min-width: 50rem">
            <Column header="#" headerStyle="width:3rem">
                <template #body="slotProps">
                    {{ slotProps.index + 1 }}
                </template>
            </Column>
            <Column field="name" header="Name"></Column>
            <Column field="teamLeader" header="Team Leader">
                <template #body="slotProps">
                    <div class="flex flex-column">
                        <span class="font-bold">{{ slotProps.data.teamLeader.firstName }} {{ slotProps.data.teamLeader.lastName }}</span>
                        <span class="text-sm">{{  slotProps.data.teamLeader.jobPosition  }}</span>
                    </div>
                </template>
            </Column>
            <Column header="Details">
                <template #body="slotProps">
                    <TeamDetails :team="slotProps.data" />
                </template>
            </Column>
        </DataTable>
    </div>  
</template>

<script setup>
import { ref,computed, onMounted } from 'vue';
import { useTeamsStore } from '../stores/teams';
import AddTeam from '../components/teams/AddTeam.vue';
import EditTeam from '../components/teams/EditTeam.vue';
import DeleteTeam from '../components/teams/DeleteTeam.vue';
import TeamDetails from '@/components/teams/TeamDetails.vue'

const teamStore = useTeamsStore()
const teams = ref(null)
const selectedTeam = ref(null)

const isButtonDisabled = computed(() => {
    return selectedTeam.value ? false : true
})

onMounted(() => {
    teams.value = teamStore.teams
})

const setSelectedTeamToNull = () => {
    selectedTeam.value = null
}
</script>