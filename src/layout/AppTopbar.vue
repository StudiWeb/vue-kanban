<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { usePrimeVue } from 'primevue/config';

const { layoutConfig, onMenuToggle } = useLayout();

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);

onMounted(() => {
    bindOutsideClickListener();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};

const appThemeSwicthInput = ref(true);
const PrimeVue = usePrimeVue();
watch(() => appThemeSwicthInput.value, (value) => {
    if(value) {
        PrimeVue.changeTheme('aura-dark-green', 'aura-light-green', 'theme-css', () => {
            layoutConfig.darkTheme.value = false
            layoutConfig.theme.value = 'aura-light-green'
        });
    } else {
        PrimeVue.changeTheme('aura-light-green', 'aura-dark-green', 'theme-css', () => {
            layoutConfig.darkTheme.value = true
            layoutConfig.theme.value = 'aura-dark-green'
        });
    }
})

</script>

<template>
    <div class="layout-topbar">
        <router-link to="/" class="layout-topbar-logo">
            <img :src="logoUrl" alt="logo" />
            <span>KANABN</span>
        </router-link>

        <div class="flex justify-content-between align-items-center w-full">
            <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
                <i class="pi pi-bars"></i>
            </button>
            <div class="flex align-items-center gap-2">
                <InputSwitch v-model="appThemeSwicthInput" />
                <i v-if="appThemeSwicthInput" class="pi pi-sun" style="font-size: 1.5rem"></i>
                <i v-else class="pi pi-moon" style="font-size: 1.5rem"></i>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
