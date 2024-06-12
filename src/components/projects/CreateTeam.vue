<template>
    <div class="py-2 flex flex-column gap-4">
        <div class="flex flex-column gap-2">
            <label for="name">Team name</label>
            <InputText id="name" v-model="name" v-bind="nameAttrs" />
            <small v-if="errors.name" class="text-red-500">{{errors.name}}</small>
        </div>
        <div class="flex flex-column gap-2">
            <label for="username">Team Leader</label>
            <Dropdown v-model="teamLeader" v-bind="teamLeaderAttrs" :options="teamLeaders" optionLabel="firstName" placeholder="Select a team leader" checkmark :highlightOnSelect="false">
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
            <small v-if="errors.teamLeader" class="text-red-500">{{errors.teamLeader}}</small>
        </div>
        <div class="flex flex-column gap-2">
            <span>Team members</span>
            <small v-if="errors.employees" class="text-red-500">{{errors.employees}}</small>
            <PickList v-model="employees" @move-to-source="moveToSource" @move-all-to-source="moveToSource" v-bind="employeesAttrs" listStyle="height:342px" dataKey="id">
                <template #sourceheader> Available </template>
                <template #targetheader> Selected </template>
                <template #item="slotProps">
                    <div class="flex flex-wrap p-2 align-items-center gap-3">
                        <span class="inline-flex flex-column">
                            <span class="font-bold">{{ slotProps.item.firstName }} {{ slotProps.item.lastName }}</span>
                            <span class="text-sm">{{  slotProps.item.jobPosition  }}</span>
                        </span>
                    </div>
                </template>
            </PickList>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useEmployeesStore } from '@/stores/employees.js'
import { useTeamsStore } from '../../stores/teams';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import selectSupervisor from '@/components/teams/composables/selectSupervisor.js'

const emit = defineEmits(['create-team'])
const employeesStore = useEmployeesStore()
const teamStore = useTeamsStore()

const teamLeaders = computed(() => {
    return employeesStore.teamLeaders
})

const { errors, defineField , handleSubmit} = useForm({
    initialValues: {
        name: '',
        teamLeader: null,
        employees: [employeesStore.employees,[]]
    },
    validationSchema: {
        name: yup.string().required().label('Team name'),
        teamLeader: yup.object().required().label('Team leader'),
        employees: value => (value[1].length > 1 ? true : 'Team has to have at least two members')
    }
});

const [name, nameAttrs] = defineField('name', {
    validateOnModelUpdate: false
});
const [teamLeader, teamLeaderAttrs] = defineField('teamLeader',{
    validateOnModelUpdate: false
});
const [employees, employeesAttrs] = defineField('employees',{
    validateOnModelUpdate: false
});

watch(teamLeader,(value) => {
    const availableEmployees = employees.value[0]
    const selectedEmployees = employees.value[1]
    selectSupervisor(value,availableEmployees,selectedEmployees)
})

const moveToSource = (data) => {
    /**
     * unselects a team leader
     * when is removed from selecetd team members list
     */
    data.items.forEach(tm => {
        if(teamLeader.value && tm.id === teamLeader.value.id) {
            teamLeader.value = null
        }
    });   
}

const createTeam = handleSubmit(values => {
    emit('create-team',values)
});

const newTeam = ref(null)
</script>