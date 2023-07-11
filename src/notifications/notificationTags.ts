import OneSignal from "react-native-onesignal";

export function TagUserEmailCreate(email:string){
    OneSignal.sendTag('user_email', email)
}