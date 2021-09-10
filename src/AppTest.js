import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {
  showNotification,
  handleScheduleNotification,
  handleCancel,
  createDefaultChannels,
} from './common/Notification';
const AppTest = () => {
  React.useEffect(() => {
    createDefaultChannels();
    PushNotification.popInitialNotification(notification => {
      console.log('Initial Notification', notification);
    });

    PushNotification.getChannels(function (channels) {
      console.log(channels);
      const channel_id = channels[0];
      PushNotification.channelExists(channel_id, function (exists) {
        console.log(exists); // true/false
      });
      PushNotification.channelBlocked(channel_id, function (blocked) {
        console.log(blocked); // true/false
      });
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text>PushNotification</Text>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => showNotification('paula', 'hello', 'message')}>
        <View style={styles.button}>
          <Text style={styles.buttonTitle}>Click me to get notification</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() =>
          handleScheduleNotification('paula', 'hi', 'after 5 sec')
        }>
        <View style={styles.button}>
          <Text style={styles.buttonTitle}>
            Click me to get notification after 5 sec
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6} onPress={handleCancel}>
        <View style={styles.button}>
          <Text style={styles.buttonTitle}>
            Click me to cancel all notifications
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default AppTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 16,
    backgroundColor: 'blue',
    borderRadius: 30,
    marginTop: 16,
  },
  buttonTitle: {
    color: 'white',
  },
});
