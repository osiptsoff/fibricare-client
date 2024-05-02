import { createRouter, createWebHistory } from "vue-router";
import AdminStubComponent1 from "../components/AdminStubComponent1.vue";
import AdminStubComponent2 from "../components/AdminStubComponent2.vue";
import AdminView from "../views/AdminView.vue";
import DoctorView from "../views/DoctorView.vue";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: () => {
                if(localStorage.getItem('roles')?.includes('admin')) {
                    return 'admin';
                }
                if(localStorage.getItem('roles')?.includes('doctor')) {
                    return 'doctor';
                }
                return 'login';
            }
        },
        {
            path: '/login',
            component: LoginView,
        },
        {
            path: '/admin',
            component: AdminView,
            meta: { forRole: 'admin' },
            children: [
                {
                    path: 'stub1',
                    component: AdminStubComponent1,
                    meta: { forRole: 'admin' }
                },
                {
                    path: 'stub2',
                    component: AdminStubComponent2,
                    meta: { forRole: 'admin' }
                }
            ]
        },
        {
            path: '/doctor',
            component: DoctorView,
            meta: { forRole: 'doctor' },
        }
    ]
});

router.beforeEach((to, _, next) => {
    const role = to.meta.forRole as string | undefined;
    if(role && !localStorage.getItem('roles')?.includes(role)) {
        return next('/login');
    }
    next(); 
});

export default router;