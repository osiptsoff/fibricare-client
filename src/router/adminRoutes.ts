import AdminView from "../views/AdminView.vue";
import AdminDoctorView from "../views/children/AdminDoctorView.vue";
import AdminPatientView from "../views/children/AdminPatientView.vue";

const adminRoutes = {
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
};

export default adminRoutes;