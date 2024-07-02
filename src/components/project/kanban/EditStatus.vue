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
                    <template #value="slotProps">
                        <TaskStatus v-if="slotProps.value" :status="slotProps.value" />
                    </template>
                    <template #option="slotProps">
                        <TaskStatus :status="slotProps.option" />
                    </template>
                </Dropdown>
                <small v-if="errors.status" class="text-red-500">{{ errors.status }}</small>
            </div>
            <template #footer>
                <Button label="Cancel" severity="secondary" @click="closeDialog" />
                <Button label="Edit" @click="editStatus" :loading="editing" />
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
    import TaskStatus from '@/components/UI/TaskStatus.vue'
    
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
        projectStore.editStatus(projectId.value,props.taskId, values.status)
        .then(data => {
            toast.add({ severity: 'success', summary: 'Editing status', detail: data, life: 3000 });
        }).catch(error => {
            toast.add({ severity: 'error', summary: 'Editing status', detail: error, life: 3000 });
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