import OneSignal from "react-native-onesignal";

export function TagUserEmailCreate(email:string){
    OneSignal.sendTag('user_email', email)
}

export function tagCartUpdate(itemsCount:string){
    OneSignal.sendTag('cart_item_count', itemsCount)
}