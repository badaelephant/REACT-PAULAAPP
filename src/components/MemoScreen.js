import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import axios from 'axios';
import * as React from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Icon} from 'react-native-vector-icons/AntDesign';
import {AppContext} from '../common/AppContextProvider';
const base_url = 'https://paula-todo-app.herokuapp.com/';
const Stack = createNativeStackNavigator();

export const MemoListScreen = ({navigation}) => {
  const {setUser} = React.useContext(AppContext);
  const [memos, setMemos] = React.useState([]);
  React.useEffect(() => {
    getMemoList();
  }, []);
  const logout = () => {
    AsyncStorage.clear();
    setUser(null);
  };

  const getMemoList = async () => {
    console.log('getMemoList');
    const result = await axios.get(base_url + 'api/memos', {
      withCredentials: true,
    });
    setMemos(result.data.memos);
  };

  const onClickMemo = id => e => {
    let memo = memos.filter(memo => memo._id == id)[0];
    console.log(memo);
    navigation.navigate('MemoDetail', {
      _id: id,
      title: memo.title,
      text: memo.text,
    });
  };
  const onRemove = id => e => {
    console.log(id);
    // axios
    //   .delete(base_url + 'api/memos/' + id)
    //   .then(response => setMemos(memos.filter(memo => memo._id !== id)));
  };
  const createMemo = () => {
    navigation.navigate('MemoDetail', {
      _id: null,
      title: '',
      text: '',
    });
  };

  return (
    <View style={styles.bodyContainer}>
      <Text style={styles.appTitle}>Hello MemoList</Text>

      <View style={styles.card}>
        <View style={{width: '100%'}}>
          <Button title=" + " onPress={createMemo} />
          <Button title=" - " onPress={createMemo} />
        </View>
        <ScrollView contentContainerStyle={styles.listContainer}>
          {memos.map(memo => (
            <MemoListItem
              key={memo._id}
              {...memo}
              onClickMemo={onClickMemo}
              onRemove={onRemove}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export const MemoListItem = ({_id, title, onClickMemo, onRemove}) => {
  const [isSelected, setSelection] = React.useState(false);

  return (
    <View style={styles.container}>
      <CheckBox
        value={isSelected}
        onValueChange={setSelection}
        style={styles.checkbox}
      />
      <Text onPress={onClickMemo(_id)} style={styles.text}>
        {title}
      </Text>
    </View>
  );
};
export const MemoDetailScreen = ({navigation, route}) => {
  const {_id, title, text} = route.params;
  const [newTitle, setNewTitle] = React.useState(title);
  const [newText, setNewText] = React.useState(text);
  // const [isEdit, setIsEdit] = React.useState(Boolean(_id));
  // console.log('isEditCheck');
  // console.log(isEdit);

  return (
    <View style={styles.bodyContainer}>
      <Text style={styles.appTitle}>Hello MemoDetail</Text>
      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <TextInput
            value={newTitle}
            style={styles.input}
            onChangeText={setNewTitle}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={newText}
            multiline={true}
            style={styles.inputArea}
            onChangeText={setNewText}
          />
        </View>
      </View>
    </View>
  );
};

function MemoScreen() {
  return (
    <Stack.Navigator initialRouteName="MemoList">
      <Stack.Screen
        name="MemoList"
        component={MemoListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MemoDetail"
        component={MemoDetailScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,

    backgroundColor: '#3143e8',
  },
  appTitle: {
    color: '#fff',
    fontSize: 36,
    marginTop: 30,
    marginBottom: 30,
    fontWeight: '300',
    textAlign: 'center',
    backgroundColor: '#3143e8',
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 10, // to provide rounded corners
    borderTopRightRadius: 10, // to provide rounded corners
    marginLeft: 10,
    marginRight: 10,
  },
  container: {
    flex: 1,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    flex: 8,
    fontWeight: '500',
    backgroundColor: '#faebd7',
    borderRadius: 10,
    fontSize: 18,
    margin: 10,
    padding: 10,
  },
  textIcon: {
    flex: 1,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: 'blue',
    borderWidth: 2,
    marginRight: 20,
    marginLeft: 20,
  },
  completeCircle: {
    marginRight: 20,
    marginLeft: 20,
  },
  strikeText: {
    color: '#bbb',
    textDecorationLine: 'line-through',
  },
  unstrikeText: {
    color: '#29323c',
  },
  buttons: {
    flexDirection: 'row',
  },
  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 24,
    marginLeft: 20,
  },
  inputArea: {
    flex: 1,
    padding: 20,

    fontSize: 24,
    marginLeft: 20,
  },
  button: {
    marginRight: 10,
  },
  listContainer: {
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});
export default MemoScreen;
