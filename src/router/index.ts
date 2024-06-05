import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import adminRoutes from "./adminRoutes";
import doctorRoutes from "./doctorRoutes";

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
        adminRoutes,
        doctorRoutes,
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