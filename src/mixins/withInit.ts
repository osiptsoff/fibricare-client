import { ref } from "vue";
import usePatient from "../hooks/usePatient";
import { useActiveDoctorStore } from "../stores/activeDoctorStore";

const { getOne } = usePatient();

const withInit = (patientId: number) => {
    const initError = ref<false | string>(false);
    const { doctor, selectedPatient, setSelectedPatient, init: initDoctor } = useActiveDoctorStore();

    const init = async () => {
        if(!doctor.value) {
            await initDoctor();
        }
        if(!selectedPatient.value) {
            const patient =  await getOne(patientId);
            if(typeof patient === 'string') {
                initError.value = patient;
                return;
            }
            if(patient.doctorId !== doctor.value?.id) {
                initError.value = "Указан неверный идентификатор пациента";
                return;
            }
    
            setSelectedPatient(patient);
        }
    };

    return {
        initError,
        init
    };
};

export default withInit;