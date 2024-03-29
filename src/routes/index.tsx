import { useEffect, useState } from 'react';
import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';



import { AppRoutes } from './app.routes';
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';
import { Notification } from '../components/Notification';

const linking = {
  prefixes: [' com.arleysouto.teste://', 'igniteshoesapp://', 'exp+igniteshoesapp://'],
  config: {
    screens: {
      details: {
        path: 'details/:productId',
        parse: {
          productId: (productId: string) => productId
        }
      }
    }
  }
}

export function Routes() {
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];
  const [notification, setNotification] = useState<OSNotification>()


  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationWillShowInForegroundHandler((NotificationReceivedEvent: NotificationReceivedEvent) => {
      const response = NotificationReceivedEvent.getNotification();

      setNotification(response)
    })

    return () => unsubscribe;
  }, [])

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />
      {
        notification?.title &&
        <Notification data={notification} onClose={() => setNotification(undefined)} />
      }
    </NavigationContainer>
  );
}