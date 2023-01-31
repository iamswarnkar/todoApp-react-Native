/* eslint-disable prettier/prettier */
import {View, Button, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';

interface Page {
  start: number;
  end: number;
}
interface Props {
  todosSize: number;
  setPage: React.Dispatch<React.SetStateAction<Page>>;
}
export default function Pagination({todosSize, setPage}: Props): JSX.Element {
  const [count, setCount] = useState<number>(1);
  const [numberOfBtn, setNumberOfBtn] = useState<number>(0);
  const showPerPage = 6;
  useEffect(() => {
    const end = showPerPage * count;
    const start = end - showPerPage;
    setPage({start, end});
    setNumberOfBtn(Math.ceil(todosSize / showPerPage));
  }, [count, setPage, todosSize]);
  return (
    <>
      {Math.ceil(todosSize / showPerPage) > 0 && (
        <View style={styles.Page}>
          <View>
            <Button
              disabled={count === 1}
              onPress={() => setCount(count - 1)}
              title="<<"
            />
          </View>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            {new Array(numberOfBtn).fill('').map((items, idx) => (
              <Button
                key={idx}
                onPress={() => setCount(idx + 1)}
                title={`${idx + 1}`}
              />
            ))}
          </View>
          <View>
            <Button
              disabled={Math.ceil(todosSize / showPerPage) === count}
              onPress={() => setCount(count + 1)}
              title=">>"
            />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 30,
  },
  text: {
    display: 'flex',
  },
  Page: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});
