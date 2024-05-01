import FeedbackInfo from "./FeedbackInfo";

export default interface Pulse {
    feedback: FeedbackInfo;
    rate: number;
    scale: string;
}