<template>
    <div>
        <Button 
            @click="openDialog"
            icon="pi pi-sort" 
            severity="warning" 
            v-tooltip.bottom="{
                value: 'Edit status',
            }"
        />
        <Dialog v-model:visible="isDialogVisible" modal header="Edit status" :style="{ width: '25rem' }">
            <div class="flex flex-column gap-2">
                <label for="status">Status</label>
                <Dropdown v-model="status" v-bind="statusAttrs" :options="statuses" id="status" placeholder="Select status" checkmark :highlightOnSelect="false">
                    <!-- <template #value="slotProps">
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
                    </template> -->
                </Dropdown>
                <small v-if="errors.status" class="text-red-500">{{ errors.status }}</small>
            </div>
            <template #footer>
                <Button label="Cancel"  severity="secondary" @click="closeDialog" />
                <Button label="Edit" @click="editStatus" :loading="editing" />
            </template>
        </Dialog>
        <Toast />
    </div>
    </template>
    
    <script setup>
    import { ref, onMounted, computed } from 'vue';
    import { useRoute } from 'vue-router'
    import * as yup from 'yup';
    import { useForm } from 'vee-validate'
    import { useProjectsStore } from '@/stores/projects'
    import { useToast } from "primevue/usetoast";
    
    const props = defineProps({
        taskId: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    })
    const route = useRoute()
    const projectStore = useProjectsStore()
    const projectId = ref(null)
    const toast = useToast()
    const statuses = ['backlog','doing','review','done']
    onMounted(() => {
        projectId.value = route.params.id
    })
    
    const { errors, handleSubmit, defineField } = useForm({
    initialValues: {
        status: '',
    },
      validationSchema: yup.object({
        status: yup.string().required().label('Status'),
      }),
    });
    
    const [status, statusAttrs] = defineField('status',{
        validateOnModelUpdate: false,
    });
    
    const initFormValue = () => {
        status.value = props.status
    }
    
    const editing = computed(() => {
        return projectStore.pending
    })
    
    const editStatus = handleSubmit(values => {
        projectStore.editDescription(projectId.value,props.taskId, values.description)
        .then(data => {
            toast.add({ severity: 'success', summary: 'Editing description', detail: data, life: 3000 });
        }).catch(error => {
            toast.add({ severity: 'error', summary: 'Editing description', detail: error, life: 3000 });
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