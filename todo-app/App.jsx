import React, { useEffect } from 'react';
import {
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigators from './src/navigators/AppNavigators';
import PushNotification from 'react-native-push-notification';
import { color } from './src/constant/color';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';

function App() {

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
      PushNotification.localNotification({
        channelId: "Boiler-Plate", // (required) channelId, if the channel doesn't exist, notification will not trigger.
        title: remoteMessage?.notification?.title, // (optional)
        message: remoteMessage?.notification?.body, // (required)
        messageId: remoteMessage?.messageId, // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module. 
        showWhen: true, // (optional) default: true
        autoCancel: true, // (optional) default: true
        largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
        largeIconUrl: remoteMessage?.notification?.android?.imageUrl, // (optional) default: undefined
        color: color.persian_Blue, // (optional) default: system default
        vibrate: true, // (optional) default: true
        vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        priority: "high", // (optional) set notification priority, default: high
        visibility: "private", // (optional) set notification visibility, default: private
        onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false
        timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
        // actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
        invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
        playSound: true, // (optional) default: true
        soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    getToken()
  }, []);

  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      if (token) {
        // console.log("Firebase Messaging Token For Push Notification", token);
      };
    } catch (error) {
      console.log("Promise reject on get token", error);
    }
    return
  };

  return (
    <Provider store={store} >
      <NavigationContainer>
        <AppNavigators />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
