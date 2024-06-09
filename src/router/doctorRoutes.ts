import DoctorView from "../views/DoctorView.vue";
import DoctorPatientView from "../views/children/DoctorPatientView.vue";
import PatientActivityView from "../views/children/PatientActivityView.vue";
import PatientChadsView from "../views/children/PatientChadsView.vue";
import PatientComplaintsView from "../views/children/PatientComplaintsView.vue";
import PatientHasbledView from "../views/children/PatientHasbledView.vue";
import PatientHeartbeatView from "../views/children/PatientPulseView.vue";
import PatientInrView from "../views/children/PatientInrView.vue";
import PatientPressureView from "../views/children/PatientPressureView.vue";
import PatientTopicView from "../views/children/PatientTopicView.vue";
import PatientVisitView from "../views/children/PatientVisitView.vue";
import PatientTreatmentsView from "../views/children/PatientTreatmentsView.vue";
import PatientWeightView from "../views/children/PatientWeightView.vue";

const doctorRoutes = {
    path: '/doctor',
    name: 'doctor',
    component: DoctorView,
    meta: { forRole: 'doctor' },
    children: [
        {
            path: 'patient/:id?',
            name: 'doctor-patient',
            component: DoctorPatientView,
            meta: { forRole: 'doctor' },
            children: [
                {
                    path: 'chads',
                    name: 'patient-chads',
                    component: PatientChadsView,
                    meta: { forRole: 'doctor' }
                },
                {
                    path: 'hasbled',
                    name: 'patient-hasbled',
                    component: PatientHasbledView,
                    meta: { forRole: 'doctor' }
                },
                {
                    path: 'inr',
                    name: 'patient-inr',
                    component: PatientInrView,
                    meta: { forRole: 'doctor' }
                },
                {
                    path: 'visit',
                    name: 'patient-visit',
                    component: PatientVisitView,
                    meta: { forRole: 'doctor' }
                },
                {
                    path: 'topic',
                    name: 'patient-topic',
                    component: PatientTopicView,
                    meta: { forRole: 'doctor' }
                },
                {
                    path: 'heartbeat',
                    name: 'patient-heartbeat',
                    component: PatientHeartbeatView,
                    meta: { forRole: 'doctor' }
                },
                {
                    path: 'pressure',
                    name: 'patient-pressure',
                    component: PatientPressureView,
                    meta: { forRole: 'doctor' }
                },
                {
                    path: 'weight',
                    name: 'patient-weight',
                    component: PatientWeightView,
                    meta: { forRole: 'doctor' }
                },
                {
                    path: 'complaints',
                    name: 'patient-complaints',
                    component: PatientComplaintsView,
                    meta: { forRole: 'doctor' }
                },
                {
                    path: 'activity',
                    name: 'patient-activity',
                    component: PatientActivityView,
                    meta: { forRole: 'doctor' }
                },
                {
                    path: 'treatments',
                    name: 'patient-treatments',
                    component: PatientTreatmentsView,
                    meta: { forRole: 'doctor' }
                },
            ]
        }
    ]
};

export default doctorRoutes;