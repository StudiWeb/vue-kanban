<template>
    <div class="card"><div class="font-medium text-2xl">Teams</div></div>
    <div class="card">
        <Toolbar class="mb-4">
            <template #start>
                <AddTeam @set-selected-team-to-null="setSelectedTeamToNull" />
                <EditTeam @set-selected-team-to-null="setSelectedTeamToNull" :team="selectedTeam" :is-disabled="isButtonDisabled" />
            </template>
            <template #end>
                <DeleteTeam @set-selected-team-to-null="setSelectedTeamToNull" :team="selectedTeam" :is-disabled="isButtonDisabled" />
            </template>
        </Toolbar>
        <DataTable v-model:selection="selectedTeam" :value="teams" paginator :rows="5" selectionMode="single" :metaKeySelection="true" dataKey="id" tableStyle="min-width: 50rem">
            <template #empty>
                <div>No data to display</div>
            </template>
            <Column header="#" headerStyle="width:3rem">
                <template #body="slotProps">
                    {{ slotProps.index + 1 }}
                </template>
            </Column>
            <Column field="name" header="Name"></Column>
            <Column field="teamLeader" header="Team Leader">
                <template #body="slotProps">
                    <div class="flex align-items-center gap-2">
                        <EmployeeAvatar :photo="slotProps.data.teamLeader.photo"  size="large"/>
                        <div class="flex flex-column">
                            <span class="font-bold">{{ slotProps.data.teamLeader.firstName }} {{ slotProps.data.teamLeader.lastName }}</span>
                            <span class="text-sm">{{  slotProps.data.teamLeader.jobPosition  }}</span>
                        </div>
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
import EmployeeAvatar from '@/components/UI/EmployeeAvatar.vue';

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