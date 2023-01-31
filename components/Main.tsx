/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useRef, useState} from 'react';
import TodosList from './TodosList';
interface Todos {
  id: number;
  todo: string;
  fav: boolean;
}
const height = Dimensions.get('screen').height;

export default function Main(): JSX.Element {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [text, setText] = useState<string>('');

  // console.log(text);
  const inputRef = useRef<TextInput>(null);
  function handlePress() {
    if (text) {
      setTodos([...todos, {id: Date.now(), todo: text, fav: false}]);
      setText('');
    }
    inputRef.current?.focus();
  }
  return (
    <>
      <View style={styles.main}>
        <Text style={styles.test}>To-dos App </Text>
        <View style={styles.input__container}>
          <TextInput
            ref={inputRef}
            value={text}
            onChangeText={setText}
            style={styles.input}
            placeholder="Enter Your To-dos "
            placeholderTextColor="#fff"
          />
          <TouchableOpacity onPress={handlePress} style={styles.button}>
            <Text style={{color: '#fff', fontSize: 15, fontWeight: '700'}}>
              Add
            </Text>
          </TouchableOpacity>
        </View>
        <TodosList todos={todos} setTodos={setTodos} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    height: height,
    width: '100%',
  },
  test: {
    marginTop: 80,
    color: '#fff',
    fontSize: 25,
    fontWeight: '600',
  },
  input__container: {
    display: 'flex',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 25,
  },
  input: {
    width: '75%',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: '#fff',
    color: '#fff',
    marginRight: 5,
  },
  button: {
    width: 80,
    alignItems: 'center',
    backgroundColor: '#0cff84',
    padding: 10,
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
  },
});
