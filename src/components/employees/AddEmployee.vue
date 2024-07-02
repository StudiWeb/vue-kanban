<template>
    <Button @click="openDialog" label="New" icon="pi pi-plus" severity="success" class="mr-2" />
    <Dialog v-model:visible="isDialogVisible" :style="{width: '450px'}" header="Add employee" :modal="true">
        <div class="flex flex-column gap-4">
            <div class="flex flex-column gap-4">
                <div class="flex flex-column gap-2">
                    <label for="firstName">First Name</label>
                    <InputText id="firstName" v-model="firstName" v-bind="firstNameAttrs" :invalid="errors.firstName" />
                    <small v-if="errors.firstName" class="text-red-500">{{errors.firstName}}</small>
                </div>
                <div class="flex flex-column gap-2">
                    <label for="lastName">Last Name</label>
                    <InputText id="lastName" v-model="lastName" v-bind="lastNameAttrs" :invalid="errors.lastName" />
                    <small v-if="errors.lastName" class="text-red-500">{{errors.lastName}}</small>
                </div>
                <div class="flex flex-column gap-2">
                    <label for="jobPosition">Job Position</label>
                    <InputText id="jobPosition" v-model="jobPosition" v-bind="jobPositionAttrs" :invalid="errors.jobPosition" />
                    <small v-if="errors.jobPosition" class="text-red-500">{{errors.jobPosition}}</small>
                </div>
                <div class="flex flex-column gap-2">
                    <label for="phone">Phone</label>
                    <InputMask id="phone"  v-model="phone" v-bind="phoneAttrs" :invalid="errors.phone" mask="(999) 999-9999" />
                    <small v-if="errors.phone" class="text-red-500">{{errors.phone}}</small>
                </div>
                <div class="flex flex-column gap-2">
                    <label for="email">Email</label>
                    <InputText id="email" v-model="email" v-bind="emailAttrs" :invalid="errors.email" />
                    <small v-if="errors.email" class="text-red-500">{{errors.email}}</small>
                </div>
            </div>
            <div class="card flex flex-column gap-3">
                <div class="text-lg font-medium">Roles</div>
                <div class="flex flex-column gap-4">
                    <div class="flex align-items-center">
                        <Checkbox v-model="roles" v-bind="rolesAttrs" inputId="projectManager" name="roles" value="projectManager" />
                        <label for="projectManager" class="ml-2"> Project manager </label>
                    </div>
                    <div class="flex align-items-center">
                        <Checkbox v-model="roles"  v-bind="rolesAttrs" inputId="teamLeader" name="roles" value="teamLeader" />
                        <label for="teamLeader" class="ml-2"> Team leader </label>
                    </div>
                </div>
                <small>*employees may have additional roles</small>
            </div>
        </div>
        <template #footer>
            <Button @click="closeDialog" label="Cancel" text />
            <Button @click="addEmployee" label="Add" :loading="adding" />
        </template>
    </Dialog>
    <Toast />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from "primevue/usetoast";
import * as yup from 'yup';
import { useForm } from 'vee-validate'
import { useEmployeesStore } from '@/stores/employees.js'

const emit = defineEmits('setSelectedEmployeeToNull')

const employeesStore = useEmployeesStore()

const adding = computed(() => {
    return employeesStore.pending
})

const { errors, handleSubmit, defineField,resetForm } = useForm({
initialValues: {
    firstName: '',
    lastName: '',
    jobPosition: '',
    phone: '',
    email: '',
    roles: []
},
  validationSchema: yup.object({
    firstName: yup.string().required().label('First name'),
    lastName: yup.string().required().label('Last name'),
    jobPosition: yup.string().required().label('Job position'),
    phone: yup.string().matches(/^\([2-9][0-9]{2}\) ?[2-9][0-9]{2}-[0-9]{4}\b/, 'Phone is not valid').required().label('Phone'),
    email: yup.string().email().required().label('Email'),
    roles: yup.array().label('Roles')
  }),
});

const [firstName, firstNameAttrs] = defineField('firstName',{
    validateOnModelUpdate: false,
});
const [lastName, lastNameAttrs] = defineField('lastName',{
    validateOnModelUpdate: false,
});
const [jobPosition, jobPositionAttrs] = defineField('jobPosition',{
    validateOnModelUpdate: false,
});
const [phone, phoneAttrs] = defineField('phone',{
    validateOnModelUpdate: false,
});
const [email, emailAttrs] = defineField('email',{
    validateOnModelUpdate: false,
});

const [roles, rolesAttrs] = defineField('roles',{
    validateOnModelUpdate: false,
});

const toast = useToast();

const addEmployee = handleSubmit(values => {
  employeesStore.addEmployee({
    ...values
  }).then(data => {
    toast.add({ severity: 'success', summary: 'Adding new employee', detail: data, life: 3000 });
  }).catch(error => {
    toast.add({ severity: 'error', summary: 'Adding new employee', detail: error, life: 3000 });
  }).finally(() => {
    emit('setSelectedEmployeeToNull')
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