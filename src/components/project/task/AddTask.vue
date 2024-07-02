<template>
    <Button @click="openDialog" label="New" icon="pi pi-plus" severity="success" class="mr-2" />
    <Dialog v-model:visible="isDialogVisible" :style="{width: '450px'}" header="Add task" :modal="true">
        <div class="flex flex-column gap-4">
            {{ pending }}
            <div class="flex flex-column gap-4">
                <div class="flex flex-column gap-2">
                    <label for="name">Name</label>
                    <InputText id="name" v-model="name" v-bind="nameAttrs" :invalid="errors.name" />
                    <small v-if="errors.name" class="text-red-500">{{errors.name}}</small>
                </div>
                <div class="flex flex-column gap-2">
                    <label for="description">Description</label>
                    <Textarea id="description" v-model="description" v-bind="descriptionAttrs" :invalid="errors.description" rows="5" cols="30" />
                    <small v-if="errors.description" class="text-red-500">{{errors.description}}</small>
                </div>
                <div class="flex flex-column gap-2">
                    <label for="employee">Employee</label>
                    <Dropdown v-model="employee" v-bind="employeeAttrs" :options="employees" id="employee" placeholder="Select an employee" checkmark :highlightOnSelect="false">
                        <template #value="slotProps">
                            <div v-if="slotProps.value"  class="flex align-items-center gap-2">
                                <EmployeeAvatar :photo="slotProps.value.photo" />
                                <div class="flex flex-column gap-1">
                                    <span class="font-semibold text-sm">{{ slotProps.value.firstName }} {{ slotProps.value.lastName }}</span>
                                    <span class="text-sm">{{ slotProps.value.jobPosition }}</span>
                                </div>
                            </div>
                        </template>
                        <template #option="slotProps">
                            <div class="flex align-items-center gap-2">
                                <EmployeeAvatar :photo="slotProps.option.photo" />
                                <div class="flex flex-column gap-1">
                                    <span class="font-semibold text-sm">{{ slotProps.option.firstName }} {{ slotProps.option.lastName }}</span>
                                    <span class="text-sm">{{ slotProps.option.jobPosition }}</span>
                                </div>
                            </div>
                        </template>
                    </Dropdown>
                    <small v-if="errors.employee" class="text-red-500">{{ errors.employee }}</small>
                </div>
            </div>
        </div>
        <template #footer>
            <Button @click="closeDialog" label="Cancel" text />
            <Button @click="addTask" label="Add" :loading="adding" />
        </template>
    </Dialog>
    <Toast />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useToast } from "primevue/usetoast";
import { useRoute } from 'vue-router';
import * as yup from 'yup';
import { useForm } from 'vee-validate'
import { useProjectsStore } from '@/stores/projects.js'
import EmployeeAvatar from '@/components/UI/EmployeeAvatar.vue';

const emit = defineEmits(['setSelectedTaskToNull'])
const route = useRoute()
const projectStore = useProjectsStore()
const projectId = ref(null)
const employees = ref([])

onMounted(() => {
    projectId.value = route.params.id
    const project = projectStore.getProject(projectId.value)
    employees.value = project.team.teamMembers
})

const { errors, handleSubmit, defineField,resetForm } = useForm({
initialValues: {
    name: '',
    description: '',
    employee: null,
    status: 'backlog',
},
  validationSchema: yup.object({
    name: yup.string().required().label('Name'),
    description: yup.string().required().label('Description'),
    employee: yup.object().required().label('Employee'),
  }),
});

const [name, nameAttrs] = defineField('name',{
    validateOnModelUpdate: false,
});
const [description, descriptionAttrs] = defineField('description',{
    validateOnModelUpdate: false,
});
const [employee, employeeAttrs] = defineField('employee',{
    validateOnModelUpdate: false,
});

const toast = useToast();

const adding = computed(() => {
    return projectStore.pending
})

const addTask = handleSubmit(values => {
    projectStore.addTask(projectId.value, {
        ...values
    }).then(data => {
        toast.add({ severity: 'success', summary: 'Adding new task', detail: data, life: 3000 });
    }).catch(error => {
        toast.add({ severity: 'error', summary: 'Adding new task', detail: error, life: 3000 });
    }).finally(() => {
        emit('setSelectedTaskToNull')
        closeDialog()
    })
});

const isDialogVisible = ref(false)

const openDialog = () => {
    isDialogVisible.value = true
}
const closeDialog = () => {
    resetForm()
    isDialogVisible.value = false
}
</script>