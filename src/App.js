import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './components/MainScreen';
import AuthScreen from './components/AuthScreen';
import {AppContext, AppContextProvider} from './common/AppContextProvider';
import Spinner from 'react-native-loading-spinner-overlay';
import {StyleSheet} from 'react-native';
import axios from 'axios';

const Stack = createNativeStackNavigator();

function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  axios.interceptors.request.use(request => {
    if (request.method !== 'GET') {
      setIsLoading(true);
    }

    return request;
  });
  axios.interceptors.response.use(response => {
    setIsLoading(false);
    return response;
  });
  return (
    <AppContextProvider>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
}
const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
export default App;
