import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import {useIsFocused} from '@react-navigation/native';
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
  const [selectList, setSelectList] = React.useState([]);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    getMemoList();
  }, [isFocused]);
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
  const removeMemo = () => {
    console.log(selectList);
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
      <View style={styles.buttonContainer}>
        <View style={styles.buttonBox}>
          <Button title=" New Memo " onPress={createMemo} />
        </View>
        <View style={styles.buttonBox}>
          <Button title=" Delete Memo " onPress={removeMemo} />
        </View>
      </View>
      <View style={styles.card}>
        <ScrollView contentContainerStyle={styles.listContainer}>
          {memos.map(memo => (
            <MemoListItem
              key={memo._id}
              {...memo}
              onClickMemo={onClickMemo}
              selectList={selectList}
              setSelectList={setSelectList}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export const MemoListItem = ({
  _id,
  title,
  onClickMemo,
  selectList,
  setSelectList,
}) => {
  const [isSelected, setSelection] = React.useState(false);
  const changeSelect = value => {
    if (value) {
      let newlist = selectList;
      newlist.push({_id: _id});
      setSelectList(newlist);
    } else {
      let newlist = selectList.filter(item => item._id !== _id);
      setSelectList(newlist);
    }
    setSelection(value);
  };

  return (
    <View style={styles.container}>
      <CheckBox
        value={isSelected}
        onValueChange={changeSelect}
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
  const onSave = async () => {
    if (_id) {
      const result = await axios.patch(
        base_url + 'api/memos/' + _id,
        {
          title: newTitle,
          text: newText,
        },
        {
          withCredentials: true,
        },
      );
      if (result.data.success) {
        navigation.navigate('MemoList');
      }
    } else {
      const result = await axios.post(
        base_url + 'api/memos',
        {
          title: newTitle,
          text: newText,
        },
        {
          withCredentials: true,
        },
      );
      if (result.data.success) {
        navigation.navigate('MemoList');
      }
    }
  };

  return (
    <View style={styles.bodyContainer}>
      <Text style={styles.appTitle}>Hello MemoDetail</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonBox}>
          <Button title=" Save " onPress={onSave} />
        </View>
        <View style={styles.buttonBox}>
          <Button title=" Cancel " />
        </View>
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBox: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 20,
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
