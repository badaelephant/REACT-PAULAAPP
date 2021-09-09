import * as React from 'react';
import {View, Text, Button, TextInput, Alert} from 'react-native';
import Styles from '../common/Styles';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {AppContext} from '../common/AppContextProvider';
const base_url = 'https://paula-todo-app.herokuapp.com/';

const Stack = createNativeStackNavigator();

export function LoginScreen({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {setUser, setData} = React.useContext(AppContext);

  const goToRegister = () => {
    console.log('register');
    navigation.navigate('Register');
  };
  const logIn = async () => {
    console.log('LoginPage');
    if (email.length == 0 || password.length == 0) {
      Alert.alert('Warning!', 'Please write your data.');
    } else {
      try {
        const result = await axios.post(
          base_url + 'api/users/login',
          {
            email: email,
            password: password,
          },
          {withCredentials: true},
        );
        const userId = result.data.userId;
        setUser({userId: userId, email: email});
        setData();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <View style={Styles.body}>
      <Text>Login Screen</Text>
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={setEmail}
        style={Styles.textInput}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={Styles.textInput}
      />
      <View style={{width: 300}}>
        <Button title="Login" onPress={logIn} />
      </View>

      <Text style={{marginTop: 30}}>Is it your first time?</Text>
      <Text style={Styles.linkText} onPress={goToRegister}>
        Register
      </Text>
    </View>
  );
}
export function RegisterScreen({navigation}) {
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const register = async () => {
    if (
      email.length == 0 ||
      password.length == 0 ||
      name.length == 0 ||
      mobile.length == 0
    ) {
      Alert.alert('Warning!', 'Please write your data.');
    } else {
      try {
        const result = await axios.post(base_url + 'api/users', {
          name: name,
          mobile: mobile,
          email: email,
          password: password,
        });
        if (result.data.success) {
          navigation.navigate('Login');
        } else {
          Alert.alert('Warning!', 'Please Try Again.');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <View style={Styles.body}>
      <Text>Register Screen</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={Styles.textInput}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={Styles.textInput}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={Styles.textInput}
      />
      <TextInput
        placeholder="Mobile"
        value={mobile}
        onChangeText={setMobile}
        style={Styles.textInput}
      />
      <View style={{width: 300}}>
        <Button title="Register" onPress={register} />
      </View>
    </View>
  );
}

function AuthScreen({navigation}) {
  const {user} = React.useContext(AppContext);
  React.useEffect(() => {
    console.log('auth');
    console.log(user);
    if (!user) {
      console.log('go to login from auth');
      navigation.navigate('Login');
    } else {
      console.log('go to main from auth');
      navigation.navigate('Main');
    }
  }, [user]);
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
export default AuthScreen;
