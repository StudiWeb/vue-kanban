<template>
<div>
    <Button 
        @click="openDialog"
        icon="pi pi-user" 
        severity="warning" 
        v-tooltip.bottom="{
            value: 'Edit employee',
        }"
    />
    <Dialog v-model:visible="isDialogVisible" modal header="Edit Employee" :style="{ width: '25rem' }">
        <div class="flex flex-column gap-2">
            <label for="employee">Employee</label>
            <Dropdown v-model="employee" v-bind="employeeAttrs" :options="employees" id="employee" placeholder="Select an employee" checkmark :highlightOnSelect="false">
                <template #value="slotProps">
                    <div v-if="slotProps.value" class="flex align-items-center gap-2">
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
        <template #footer>
            <Button label="Cancel"  severity="secondary" @click="closeDialog" />
            <Button label="Edit" @click="editEmployee" :loading="editing" />
        </template>
    </Dialog>
</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router'
import * as yup from 'yup';
import { useForm } from 'vee-validate'
import { useProjectsStore } from '@/stores/projects'
import { useToast } from "primevue/usetoast";
import EmployeeAvatar from '@/components/UI/EmployeeAvatar.vue';

const props = defineProps({
    taskId: {
        type: String,
        required: true
    },
    employee: {
        type: Object,
        required: true
    }
})
const route = useRoute()
const projectStore = useProjectsStore()
const employees = ref([])
const projectId = ref(null)
const toast = useToast()

onMounted(() => {
    projectId.value = route.params.id
    employees.value = projectStore.getEmployees(projectId.value)
})

const { errors, handleSubmit, defineField } = useForm({
initialValues: {
    employee: null,
},
  validationSchema: yup.object({
    employee: yup.object().required().label('Employee'),
  }),
});

const [employee, employeeAttrs] = defineField('employee',{
    validateOnModelUpdate: false,
});

const initFormValue = () => {
    employee.value = props.employee
}

const editing = computed(() => {
    return projectStore.pending
})

const editEmployee = handleSubmit(values => {
    projectStore.editEmployee(projectId.value,props.taskId, {...values.employee})
    .then(data => {
        toast.add({ severity: 'success', summary: 'Editing employee', detail: data, life: 3000 });
    }).catch(error => {
        toast.add({ severity: 'error', summary: 'Editing employee', detail: error, life: 3000 });
    }).finally(() => {
        closeDialog()
    })
})

const isDialogVisible = ref(false)
const openDialog = () => {
    initFormValue()
    isDialogVisible.value = true
}
const closeDialog = () => {
    isDialogVisible.value = false
}
</script>