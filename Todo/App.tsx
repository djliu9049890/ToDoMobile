/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * double tap r to reload changes
 * @format
 */

import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

function App(): React.JSX.Element {
  const [text, setText] = useState('')
  const onSubmitPress = () => {
    console.log(text, "sfdksmd")
  }
  const ref = firestore().collection('todos');

  return (
    <View style = {style.mainContainer}>
      <View style = {{flexDirection: 'row'}}> 
        <TextInput
        value = {text}
        onChangeText = {setText}
        style = {style.textInput}
        />
        
        <TouchableOpacity 
        onPress = {onSubmitPress}
        style = {style.button}>
            <Text style = {{color: 'red'}}>
              Submit
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style=StyleSheet.create({
  textInput: {
    backgroundColor: 'green',
    width: '70%',
    height: 50,
    color: 'white',
    borderRadius: 5
  },
  mainContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 20
  },
  button: {
    width: 90,
    height: 50, 
    backgroundColor: 'yellow',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  }
})

export default App;
