<template>
    <Button @click="openDialog" :disabled="isDisabled" label="Edit" icon="pi pi-pencil" severity="warning" class="mr-2" />
    <Dialog v-model:visible="isDialogVisible" :style="{width: '900px'}" header="Edit project" :modal="true">
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
                        <div v-if="slotProps.value" class="flex flex-column gap-2">
                            <span class="font-semibold text-sm">{{ slotProps.value.firstName }} {{ slotProps.value.lastName }}</span>
                            <span class="text-sm">{{ slotProps.value.jobPosition }}</span>
                        </div>
                    </template>
                    <template #option="slotProps">
                        <div class="flex flex-column gap-2">
                            <span class="font-semibold text-sm">{{ slotProps.option.firstName }} {{ slotProps.option.lastName }}</span>
                            <span class="text-sm">{{ slotProps.option.jobPosition }}</span>
                        </div>
                    </template>
                </Dropdown>
                <small v-if="errors.projectManager" class="text-red-500">{{errors.projectManager}}</small>
            </div>
            <div class="flex flex-column gap-2">
                <label for="team">Team</label>
                    <Dropdown v-model="team" v-bind="teamAttrs" id="team" :options="teams" placeholder="Select team" checkmark :highlightOnSelect="false">
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
        </div>
        <template #footer>
            <Button @click="closeDialog" label="Cancel" text />
            <Button label="Edit" @click="editProject" :loading="editing" />
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

const props = defineProps({
    project: {
        type: Object,
        required: true
    },

    isDisabled: {
        type: Boolean,
        required: true
    }
})

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

const { errors, handleSubmit, defineField,resetForm, setFieldValue } = useForm({
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

const initFormValues = () => {
    setFieldValue('name', props.project.name)
    setFieldValue('projectManager', props.project.projectManager)
    setFieldValue('team', props.project.team)
}   

const toast = useToast();

const editing = computed(() => {
    return projectsStore.pending
})


const editProject = handleSubmit(values => {
    projectsStore
        .editProject({
            id: props.project.id,
            ...values
        })
        .then(data => {
            toast.add({ severity: 'success', summary: 'Editing the project', detail: data, life: 3000 });
        }).catch(error => {
            toast.add({ severity: 'error', summary: 'Editing the project', detail: error, life: 3000 });
        }).finally(() => {
            closeDialog()
        })
});

const isDialogVisible = ref(false)

const openDialog = () => {
    initFormValues()
    isDialogVisible.value = true
}

const closeDialog = () => {
    resetForm()
    emit('setSelectedProjectToNull')
    isDialogVisible.value = false
}

</script>