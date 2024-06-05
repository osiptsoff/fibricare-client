import { defineStore } from "pinia";
import { computed, ref } from "vue";
import useDoctor from "../hooks/useDoctor";
import Doctor from "../models/Doctor";
import Patient from "../models/Patient";

const fetchDoctor = async () => {
    const { getOne } = useDoctor();

    const id = localStorage.getItem('id');
    if(id === null) {
        throw new Error("No id in store");
    }

    const doctor = await getOne(+id);
    if(typeof doctor === 'string') {
        throw new Error("Doctor with given id does not exist");
    }

    return doctor;
};

export const useActiveDoctorStore = defineStore('activeDoctor', () => {
    const _doctor = ref<Doctor>();
    const _selectedPatient = ref<Patient>();

    const doctor = computed( () => _doctor );
    const selectedPatient = computed( () => _selectedPatient);

    const init = async () => {
        if(_doctor.value === undefined) {
            _doctor.value = await fetchDoctor();
        }
    }
    const setSelectedPatient = (patient: Patient) => {
        _selectedPatient.value = patient;
    };

    return { doctor, selectedPatient, init, setSelectedPatient };
});
