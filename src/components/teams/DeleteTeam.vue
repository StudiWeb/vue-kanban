        <template>
    <Button @click="openDialog" label="Delete" icon="pi pi-trash" severity="danger" :disabled="isDisabled" />
    <Dialog v-model:visible="isDialogVisible" header="Delete team" :modal="true">
        <Card style="overflow: hidden" class="my-2">
            <template #title>{{ team.name }}</template>
            <template #content>
                <div class="flex flex-column gap-4">
                    <div class="flex align-items-center gap-2 surface-100 border-round p-2">
                        <EmployeeAvatar :photo="team.teamLeader.photo" size="large"/>
                        <div class="flex flex-column gap-1">
                            <span class="font-medium">Team Leader</span>
                            <span>{{ team.teamLeader.firstName }} {{ team.teamLeader.lastName }}</span>
                        </div>
                    </div>
                    <DataTable :value="team.teamMembers" dataKey="id" tableStyle="min-width: 50rem">
                        <template #header>
                            <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                                <span class="text-lg text-900 font-bold">Team members</span>
                            </div>
                        </template>
                        <Column header="#" headerStyle="width:3rem">
                            <template #body="slotProps">
                                {{ slotProps.index + 1 }}
                            </template>
                        </Column>
                        <Column field="photo">
                            <template #body="slotProps">
                                <EmployeeAvatar :photo="slotProps.data.photo" size="large"/>
                            </template>
                        </Column>
                        <Column field="firstName" header="First name"></Column>
                        <Column field="lastName" header="Last name"></Column>
                        <Column field="jobPosition" header="Job position"></Column>
                        <Column field="email" header="Email"></Column>
                        <Column field="phone" header="Phone"></Column>
                    </DataTable>
                </div>
            </template>
        </Card>
        <template #footer>
            <Button @click="closeDialog" label="Cancel" text />
            <Button label="Delete" @click="deleteTeam" :loading="deleting" />
        </template>
    </Dialog> 
    <Toast />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from "primevue/usetoast";
import { useTeamsStore } from '../../stores/teams';
import EmployeeAvatar from '@/components/UI/EmployeeAvatar.vue';

const props = defineProps({
    team: {
        type: Object,
        required: true
    },
    isDisabled: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits(['setSelectedTeamToNull'])

const teamStore = useTeamsStore()

const deleting = computed(() => {
    return teamStore.pending
}) 

const isDialogVisible = ref(false)

const openDialog = () => {
    isDialogVisible.value = true
}

const closeDialog = () => {
    emit('setSelectedTeamToNull')
    isDialogVisible.value = false
}

const toast = useToast();

const deleteTeam = () => {
    teamStore.deleteTeam(props.team.id)
    .then(data => {
        toast.add({ severity: 'success', summary: 'Deleting the team', detail: data, life: 3000 });
    }).catch(error => {
        toast.add({ severity: 'error', summary: 'Deleting the team', detail: error, life: 3000 });
    }).finally(() => {
        closeDialog()
    })
}

</script>