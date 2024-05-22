import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/DashboardView.vue')
                },
                {
                    path: '/employees',
                    name: 'employees',
                    component: () => import('@/views/EmployeesView.vue')
                },
                {
                    path: '/teams',
                    name: 'teams',
                    component: () => import('@/views/TeamsView.vue')
                },
                {
                    path: '/projects',
                    name: 'projects',
                    component: () => import('@/views/ProjectsView.vue')
                },
            ]
        },
    ]
});

export default router;
