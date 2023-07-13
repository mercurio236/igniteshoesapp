import { useEffect, useState } from 'react';
import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';



import { AppRoutes } from './app.routes';
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';
import { Notification } from '../components/Notification';

export function Routes() {
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];
  const [notification, setNotification] = useState<OSNotification>()

  useEffect(() =>{
    const unsubscribe =  OneSignal.setNotificationWillShowInForegroundHandler((NotificationReceivedEvent:NotificationReceivedEvent) =>{
      const response = NotificationReceivedEvent.getNotification();

      setNotification(response)
    })

    return () => unsubscribe;
  },[])

  return (
    <NavigationContainer theme={theme}>
      <AppRoutes />
      {
        notification?.title &&
        <Notification data={notification} onClose={() => setNotification(undefined)} />
      }
    </NavigationContainer>
  );
}