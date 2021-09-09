import * as React from 'react';
import {
  ScrollView,
  TextInput,
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {AppContext} from '../common/AppContextProvider';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const base_url = 'https://paula-todo-app.herokuapp.com/';

const TodoInsert = ({addTodo}) => {
  const [todo, setTodo] = React.useState('');
  const addTodoHandler = () => {
    console.log('addTodo');
    console.log(todo);
    addTodo(todo);
    setTodo('');
  };
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Add an item!"
        placeholderTextColor={'#999'}
        value={todo}
        autoCorrect={false}
        onChangeText={setTodo}
      />
      <View style={styles.button}>
        <Button title={'ADD'} onPress={addTodoHandler} />
      </View>
    </View>
  );
};
const TodoList = ({todos, onToggle}) => {
  return (
    <ScrollView contentContainerStyle={styles.listContainer}>
      {todos.map(todo => (
        <TodoListItem key={todo._id} {...todo} onToggle={onToggle} />
      ))}
    </ScrollView>
  );
};
const TodoListItem = ({text, checked, _id, onToggle}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPressOut={onToggle(_id)}>
        {checked ? (
          <View style={styles.completeCircle}>
            <Icon name="circledowno" size={30} color="#3143e8" />
          </View>
        ) : (
          <View style={styles.circle} />
        )}
      </TouchableOpacity>
      <Text
        style={[
          styles.text,
          checked ? styles.strikeText : styles.unstrikeText,
        ]}>
        {text}
      </Text>
    </View>
  );
};
function TodoScreen({navigation}) {
  const [todos, setTodos] = React.useState([]);
  const {user} = React.useContext(AppContext);
  const addTodo = text => {
    console.log('addTodoinMain');
    setTodos([
      ...todos,
      {
        _id: Math.random().toString(),
        text: text,
        userId: user.userId,
        checked: false,
      },
    ]);
  };
  const onToggle = id => e => {
    setTodos(
      todos.map(todo =>
        todo._id === id ? {...todo, checked: !todo.checked} : todo,
      ),
    );
  };
  const getTodos = async () => {
    const result = await axios.get(base_url + 'api/todos/' + user.userId, {
      withCredentials: true,
    });
    let todos = result.data.todos;
    setTodos(todos.map(todo => ({...todo, checked: false})));
  };
  const save = async () => {
    let savetodos = todos.filter(todo => !todo.checked);
    const result = await axios.post(base_url + 'api/todos', savetodos, {
      withCredentials: true,
    });
    if (result.data.success) {
      Alert.alert('Success!', `Your Todo Has been Successfully Saved!`);
      await getTodos();
    }
  };
  const {setUser} = React.useContext(AppContext);
  const logout = () => {
    console.log('logout');
    AsyncStorage.clear();
    setUser(null);
  };

  React.useEffect(() => {
    getTodos();
  }, []);
  return (
    <View style={styles.bodyContainer}>
      <Text style={styles.appTitle}>Hello Todolist</Text>
      <View style={{width: 300}}>
        <Button title="LogOut" onPress={logout} />
      </View>
      <View
        style={{
          width: '90%',
          marginBottom: 20,
          alignSelf: 'center',
        }}>
        <Button title="Save Now" onPress={save} color="#eb6434" />
      </View>
      <View style={styles.card}>
        <TodoInsert addTodo={addTodo} />

        <TodoList todos={todos} onToggle={onToggle} />
      </View>
    </View>
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
    flex: 5,
    fontWeight: '500',
    fontSize: 18,
    marginVertical: 20,
    width: 100,
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
  button: {
    marginRight: 10,
  },
  listContainer: {
    alignItems: 'center',
  },
});
export default TodoScreen;
