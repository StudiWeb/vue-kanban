<template>
    <div>
        <Button 
            @click="openDialog"
            icon="pi pi-align-justify" 
            severity="warning" 
            v-tooltip.bottom="{
                value: 'Edit description',
            }"
        />
        <Dialog v-model:visible="isDialogVisible" modal header="Edit description" :style="{ width: '25rem' }">
            <div class="flex flex-column gap-2">
                    <label for="description">Description</label>
                    <Textarea id="description" v-model="description" v-bind="descriptionAttrs" :invalid="errors.description" rows="5" cols="30" />
                    <small v-if="errors.description" class="text-red-500">{{errors.description}}</small>
                </div>
            <template #footer>
                <Button label="Cancel"  severity="secondary" @click="closeDialog" />
                <Button label="Edit" @click="editDescription" :loading="editing" />
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
    
    const props = defineProps({
        taskId: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    })
    const route = useRoute()
    const projectStore = useProjectsStore()
    const projectId = ref(null)
    const toast = useToast()
    
    onMounted(() => {
        projectId.value = route.params.id
    })
    
    const { errors, handleSubmit, defineField } = useForm({
    initialValues: {
        description: '',
    },
      validationSchema: yup.object({
        description: yup.string().required().label('Description'),
      }),
    });
    
    const [description, descriptionAttrs] = defineField('description',{
        validateOnModelUpdate: false,
    });
    
    const initFormValue = () => {
        description.value = props.description
    }
    
    const editing = computed(() => {
        return projectStore.pending
    })
    
    const editDescription = handleSubmit(values => {
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