
import { StatusBar } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';
import { TagUserEmailCreate } from './src/notifications/notificationTags';

import { CartContextProvider } from './src/contexts/CartContext';
import { useEffect } from 'react';


OneSignal.setAppId('6af89438-1cb1-408f-b462-49e5e8ab2d82');
OneSignal.promptForPushNotificationsWithUserResponse()
OneSignal.setEmail('arley.souto@hotmail.com')

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationOpenedHandler((response) => {

      const { actionId } = response.action as any

      if (response.action) {
        console.log(actionId === '1' ? 'Ver todas' : 'Ver pedido')
      }
    })

    return () => unsubscribe
  }, [])


  TagUserEmailCreate('arley.souto@hotmail.com')



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

    </NativeBaseProvider>
  );
}