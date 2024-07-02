<template>
    <Button @click="openDialog" label="New" icon="pi pi-plus" severity="success" class="mr-2" />
    <Dialog v-model:visible="isDialogVisible" :style="{width: '900px'}" header="Add project" :modal="true">
        <div class="py-2 flex flex-column gap-4">
            <div class="flex flex-column gap-2">
                <label for="name">Project name</label>
                <InputText id="name" v-model="name" v-bind="nameAttrs" />
                <small v-if="errors.name" class="text-red-500">{{errors.name}}</small>
            </div>
            <div class="flex flex-column gap-2">
                <label for="projectManager">Project manager</label>
                <Dropdown v-model="projectManager" v-bind="projectManagerAttrs" id="projectManager" :options="projectManagers" placeholder="Select project manager" checkmark :highlightOnSelect="false">
                    <template #value="slotProps">
                        <div v-if="slotProps.value" class="flex align-items-center gap-2">
                            <EmployeeAvatar :photo="slotProps.value.photo" size="large"/>
                            <div class="flex flex-column gap-1">
                                <span class="font-semibold text-sm">{{ slotProps.value.firstName }} {{ slotProps.value.lastName }}</span>
                                <span class="text-sm">{{ slotProps.value.jobPosition }}</span>
                            </div>
                        </div>
                    </template>
                    <template #option="slotProps">
                        <div class="flex align-items-center gap-2">
                            <EmployeeAvatar :photo="slotProps.option.photo" size="large"/>
                            <div class="flex flex-column gap-1">
                                <span class="font-semibold text-sm">{{ slotProps.option.firstName }} {{ slotProps.option.lastName }}</span>
                                <span class="text-sm">{{ slotProps.option.jobPosition }}</span>
                            </div>
                        </div>
                    </template>
                </Dropdown>
                <small v-if="errors.projectManager" class="text-red-500">{{errors.projectManager}}</small>
            </div>
            <div class="flex flex-column gap-2">
                    <label for="team">Team</label>
                    <Dropdown v-model="team" v-bind="teamAttrs" :options="teams" id="team" placeholder="Select team" checkmark :highlightOnSelect="false">
                        <template #value="slotProps">
                            <div v-if="slotProps.value" class="flex flex-column gap-2">
                                <span class="font-semibold text-sm">{{ slotProps.value.name }}</span>
                                <span class="text-sm">{{ slotProps.value.teamLeader.firstName }} {{ slotProps.value.teamLeader.lastName }} (Team Leader)</span>
                            </div>
                        </template>
                        <template #option="slotProps">
                            <div v-if="slotProps.option" class="flex flex-column gap-2">
                                <span class="font-semibold text-sm">{{ slotProps.option.name }}</span>
                                <span class="text-sm">{{ slotProps.option.teamLeader.firstName }} {{ slotProps.option.teamLeader.lastName }} (Team Leader)</span>
                            </div>
                        </template>
                    </Dropdown>
                    <small v-if="errors.team" class="text-red-500">{{errors.team}}</small>
                </div>
                <TeamDetails v-if="team" :team="team" />
            </div>
        <template #footer>
            <Button @click="closeDialog" label="Cancel" text />
            <Button label="Add" @click="addProject" :loading="adding" />
        </template>
    </Dialog>
    <Toast />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from "primevue/usetoast"
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { useEmployeesStore } from '@/stores/employees.js'
import { useTeamsStore } from '@/stores/teams.js'
import { useProjectsStore } from '@/stores/projects.js'
import TeamDetails from "@/components/projects/TeamDetails.vue"
import EmployeeAvatar from '@/components/UI/EmployeeAvatar.vue';


const emit = defineEmits(['setSelectedProjectToNull'])

const employeesStore = useEmployeesStore()
const teamsStore = useTeamsStore()
const projectsStore = useProjectsStore()

const projectManagers = computed(() => {
    return employeesStore.projectManagers
})

const teams = computed(() => {
    return teamsStore.teams
})

const { errors, handleSubmit, defineField,resetForm } = useForm({
initialValues: {
    name: '',
    projectManager: null,
    team: null,
},
  validationSchema: yup.object({
    name: yup.string().required().label('Project name'),
    projectManager: yup.object().required().label('Project manager'),
    team: yup.object().required().label('Team')
  }),
});

const [name, nameAttrs] = defineField('name',{
    validateOnModelUpdate: false,
});

const [projectManager, projectManagerAttrs] = defineField('projectManager',{
    validateOnModelUpdate: false,
});

const [team, teamAttrs] = defineField('team',{
    validateOnModelUpdate: false,
});

const isDialogVisible = ref(false)

const openDialog = () => {
    isDialogVisible.value = true
}

const closeDialog = () => {
    resetForm()
    isDialogVisible.value = false
}

const toast = useToast();

const adding = computed(() => {
    return projectsStore.pending
})

const addProject = handleSubmit(values => {
    projectsStore.addProject({...values})
        .then(data => {
            toast.add({ severity: 'success', summary: 'Adding new project', detail: data, life: 3000 });
        }).catch(error => {
            toast.add({ severity: 'error', summary: 'Adding new project', detail: error, life: 3000 });
        }).finally(() => {
            newTeam.value = false
            closeDialog()
        })
    
});
</script>