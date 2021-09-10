import PushNotification, {Importance} from 'react-native-push-notification';

const createDefaultChannels = () => {
  PushNotification.createChannel(
    {
      channelId: 'paula', // (required)
      channelName: 'bernal', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: true, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    created => console.log(`createChannel returned '${created}'`),
  );
};
const showNotification = (channelId, title, message) => {
  console.log('showNotification');
  console.log(channelId);
  PushNotification.localNotification({
    channelId: channelId,
    title: title,
    mesage: message,
    allowWhileIdle: false,
    repeatTime: 1,
  });
};

const handleScheduleNotification = (channelId, title, message) => {
  console.log('handleScheduleNotification');
  console.log(channelId);
  PushNotification.localNotificationSchedule({
    channelId: channelId,
    title: title,
    mesage: message,
    date: new Date(Date.now() + 5 * 1000),
  });
};
const handleCancel = () => {
  console.log('handleCancel');
  PushNotification.cancelAllLocalNotifications();
};
export {
  createDefaultChannels,
  showNotification,
  handleScheduleNotification,
  handleCancel,
};
