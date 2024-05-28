import { createRouter, createWebHistory } from "vue-router";
import AdminView from "../views/AdminView.vue";
import DoctorView from "../views/DoctorView.vue";
import LoginView from "../views/LoginView.vue";
import AdminDoctorView from "../views/children/AdminDoctorView.vue";
import AdminPatientView from "../views/children/AdminPatientView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
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
            name: 'login',
            component: LoginView,
        },
        {
            path: '/admin',
            name: 'admin',
            component: AdminView,
            meta: { forRole: 'admin' },
            children: [
                {
                    path: 'doctor',
                    name: 'admin-doctors',
                    component: AdminDoctorView,
                    meta: { forRole: 'admin' },
                },
                {
                    path: 'patient',
                    name: 'admin-patients',
                    component: AdminPatientView,
                    meta: { forRole: 'admin' },
                }
            ]
        },
        {
            path: '/doctor',
            name: 'doctor',
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