/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import Pagination from './Pagination';

const width: number = Dimensions.get('screen').width;

interface Todos {
  id: number;
  todo: string;
  fav: boolean;
}

interface Props {
  todos: Todos[];
  setTodos: React.Dispatch<React.SetStateAction<Todos[]>>;
}

export default function TodosList({todos, setTodos}: Props): JSX.Element {
  const showPerPage = 6;
  const [page, setPage] = useState({
    start: 0,
    end: showPerPage,
  });

  if (todos.length === 0) {
    return (
      <View>
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            color: '#fff',
            fontSize: 20,
            marginTop: 70,
            fontWeight: 'bold',
          }}>
          No Data Found ☹️☹️☹️
        </Text>
      </View>
    );
  }

  function handleFavorite(id: number) {
    const fav = todos.map(todos => {
      return todos.id === id ? {...todos, fav: !todos.fav} : todos;
    });
    fav.sort((a, b) => Number(b.fav) - Number(a.fav));
    setTodos(fav);
  }
  function handleDelete(id: number) {
    const filtered = todos.filter(todos => {
      return todos.id !== id;
    });
    setTodos(filtered);
  }
  return (
    <SafeAreaView>
      <View style={{ marginTop: 20 }}>
        {todos.slice(page.start, page.end).map(items => {
          return (
            <View key={items.id} style={styles.todo__container}>
              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  paddingHorizontal: 5,
                  borderRadius: 5,
                }}>
                <Text style={styles.textColor}>{items.todo}</Text>
              </View>
              <View style={styles.btn}>
                <Button
                  onPress={() => handleFavorite(items.id)}
                  title={items.fav ? '💖' : '🖤'}
                  color="#000"
                />
                <Button
                  onPress={() => handleDelete(items.id)}
                  title="Delete"
                  color="#000"
                />
              </View>
            </View>
          );
        })}
      </View>
      <Pagination todosSize={todos.length} setPage={setPage} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  todo__container: {
    width: width - 30,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 5,
  },

  textColor: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  btn: {
    display: 'flex',
    flexDirection: 'row',
  },
  Page: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});
