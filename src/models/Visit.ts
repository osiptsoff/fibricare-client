export default interface Visit {
    id: number;
    patientId: number;
    doctorId: number;
    date: Date;
    patientComplaints: string;
    examinationResult: string;
    diagnosis: string
    assignedTreatment: string;
}