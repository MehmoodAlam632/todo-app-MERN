/**
 * @format
 */

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification, { Importance } from "react-native-push-notification";
import App from './App';
import { name as appName } from './app.json';
import { color } from './src/constant/color';

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
        // console.log("TOKEN:", token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
        console.log("NOTIFICATION: Tab", notification);

        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        //   notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);

        // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
        console.error(err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    // permissions: {
    //   alert: true,
    //   badge: true,
    //   sound: true,
    // },

    // Should the initial notification be popped automatically
    // default: true
    // popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    // requestPermissions: true,
});

PushNotification.createChannel(
    {
        channelId: "Boiler-Plate", // (required)
        channelName: "My channel", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Message handled in the background!', remoteMessage);
//     PushNotification.localNotification({
//         /* Android Only Properties */
//         channelId: "Boiler-Plate", // (required) channelId, if the channel doesn't exist, notification will not trigger.
//         title: remoteMessage?.notification?.title, // (optional)
//         message: remoteMessage?.notification?.body, // (required)
//         messageId: remoteMessage?.messageId, // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module. 
//         showWhen: true, // (optional) default: true
//         autoCancel: true, // (optional) default: true
//         largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
//         largeIconUrl: remoteMessage?.notification?.android?.imageUrl, // (optional) default: undefined
//         color: color.persian_Blue, // (optional) default: system default
//         vibrate: true, // (optional) default: true
//         vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
//         priority: "high", // (optional) set notification priority, default: high
//         visibility: "private", // (optional) set notification visibility, default: private
//         onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false
//         timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
//         actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
//         invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
//         playSound: true, // (optional) default: true
//         soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
//     });
// });

AppRegistry.registerComponent(appName, () => App);
