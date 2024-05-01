import UserInfo from "./UserInfo";

export default interface Doctor {
    userInfo: UserInfo;
    name: string;
    birthDate: Date;
    phoneNumber: string;
};