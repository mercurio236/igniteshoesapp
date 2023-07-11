import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';
import { TagUserEmailCreate } from './src/notifications/notificationTags';

import { CartContextProvider } from './src/contexts/CartContext';
import { Notification } from './src/components/Notification';

OneSignal.setAppId('6af89438-1cb1-408f-b462-49e5e8ab2d82');
OneSignal.promptForPushNotificationsWithUserResponse()
OneSignal.setEmail('arley.souto@hotmail.com')

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  const [notification, setNotification] = useState<OSNotification>()

  TagUserEmailCreate('arley.souto@hotmail.com')

  useEffect(() =>{
    const unsubscribe =  OneSignal.setNotificationWillShowInForegroundHandler((NotificationReceivedEvent:NotificationReceivedEvent) =>{
      const response = NotificationReceivedEvent.getNotification();

      setNotification(response)
    })

    return () => unsubscribe;
  },[])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
      {
        notification?.title &&
        <Notification title={notification.title} onClose={() => setNotification(undefined)}/>}
    </NativeBaseProvider>
  );
}