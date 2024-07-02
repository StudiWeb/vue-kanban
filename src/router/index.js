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
                    component: () => import('@/views/ProjectsView.vue'),
                },
            ],
        },

        {
            path: '/projects/:id',
            redirect: { name: 'project.show.board' },
            component: AppLayout,
            children: [
                {
                    path: 'board',
                    name: 'project.show.board',
                    component: () => import('@/components/project/ProjectBoard.vue'),
                },
                {
                    path: 'progress',
                    name: 'project.show.progress',
                    component: () => import('@/components/project/ProjectProgress.vue'),
                },
                {
                    path: 'tasks',
                    name: 'project.show.tasks',
                    component: () => import('@/components/project/ProjectTasks.vue'),
                },
                {
                    path: 'team',
                    name: 'project.show.team',
                    component: () => import('@/components/project/ProjectTeam.vue'),
                }
            ]
        },
        // {
        //     path: '/projects/:id',
        //     redirect: { name: 'project.show.board' },
        //     component: () => import('@/views/ProjectView.vue'),
        //     children: [
        //         {
        //             path: 'board',
        //             name: 'project.show.board',
        //             component: () => import('@/components/project/ProjectBoard.vue'),
        //         },
        //         {
        //             path: 'progress',
        //             name: 'project.show.progress',
        //             component: () => import('@/components/project/ProjectProgress.vue'),
        //         },
        //         {
        //             path: 'tasks',
        //             name: 'project.show.tasks',
        //             component: () => import('@/components/project/ProjectTasks.vue'),
        //         },
        //         {
        //             path: 'team',
        //             name: 'project.show.team',
        //             component: () => import('@/components/project/ProjectTeam.vue'),
        //         },
        //         {
        //             path: 'about',
        //             name: 'project.show.about',
        //             component: () => import('@/components/project/ProjectAbout.vue'),
        //         },
        //     ]
        // },
    ]
});

export default router;
