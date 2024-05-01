import UserInfo from "./UserInfo";

export default interface Patient {
    userInfo: UserInfo;
    name: string;
    birthDate: Date;
    phoneNumber: string;
    doctorId: number;
    snils: number;
    medcard: number;
    omiPolicy: number;
    sex: number;
}