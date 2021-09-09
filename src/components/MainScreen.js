import * as React from 'react';
import Styles from '../common/Styles';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TodoScreen from './TodoScreen';
import MemoScreen from './MemoScreen';
import AlramScreen from './AlarmScreen';

const Tab = createBottomTabNavigator();

function MainScreen() {
  return (
    <Tab.Navigator style={Styles.body}>
      <Tab.Screen
        name="Todo"
        component={TodoScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Memo"
        component={MemoScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Alram"
        component={AlramScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}
export default MainScreen;
