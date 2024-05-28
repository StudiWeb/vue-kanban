<template>
    <div class="card"><div class="font-medium text-2xl">Teams</div></div>
    <div class="card">
        <Toolbar class="mb-4">
            <template #start>
                <AddTeam />
            </template>
            <template #end>
            </template>
        </Toolbar>
    </div>  
</template>

<script setup>
import AddTeam from '../components/teams/AddTeam.vue';
</script>