import FeedbackInfo from "./FeedbackInfo";

export default interface BloodPressure {
    feedback: FeedbackInfo;
    systolic: number;
    diastolic: string;
}