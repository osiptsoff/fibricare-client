export default interface Topic {
    id: number;
    patientId: number;
    doctorId: number;
    startTime: Date;
    remindPeriodHours: number;
    text: string;
}