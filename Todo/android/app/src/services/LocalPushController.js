import PushNotification from 'react-native-push-notification';

PushNotification.configure({
    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
      console.log('LOCAL NOTIFICATION ==>', notification)
    },
  
    popInitialNotification: true,
    requestPermissions: true
  })

export const LocalNotification = () => {
    PushNotification.localNotification({
        channelId: 'todomobile-f195d',
        autoCancel: true,
        bigText:
        'This is local notification demo in React Native app. Only shown, when expanded.',
        subText: 'Local Notification Demo',
        title: 'Local Notification Title',
        message: 'Expand me to see more',
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
        actions: '["Yes", "No"]'
    })
}

export const ScheduledNotification = () => {
    PushNotification.localNotificationSchedule({
        channelId: 'todomobile-f195d',
        autoCancel: true,
        bigText: 'This is local notification demo in React Native app. Only shown when expanded.',
        subText: 'Local Notification Demo',
        title: 'Local Notification Title',
        message: 'Expand me to see more',
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
        actions: '["Yes", "No"]',
        date: new Date(Date.now() + 5000), // Schedule notification 5 seconds from now
    });
    console.log("successful")
}
