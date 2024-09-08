import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import Main from './components/Main';

export default function App(): JSX.Element {

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Main />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    color: '#fff',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
});
