/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * double tap r to reload changes
 * @format
 */

import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import notifee, { AndroidImportance } from '@notifee/react-native';
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
  Alert,
  FlatList
} from 'react-native';

interface ListItem {
  //id: string;
  title: string;
  complete: boolean;
  // Add other properties if necessary
}

function App(): React.JSX.Element {
  const [text, setText] = useState('');
  const ref = firestore().collection('todos');
  const [list, setList] = useState<ListItem[]>([]);

  async function onDisplayNotification(title: string) {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      body: "Complete your " + title + "!",
      android: {
        channelId,
        importance: AndroidImportance.HIGH, // Set priority to high for heads-up notification
        //smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  useEffect(()=>{
    return ref.onSnapshot(querySnapshot => {
      const list: ListItem[] = [];
      querySnapshot.forEach(doc => {
        list.push({
          //id: doc.data().id,
          title: doc.data().title,
          complete: doc.data().complete
        })
      })
      setList(list)
    })
  },[])

  const onSubmitPress = async() => {
    console.log(text, "sfdksmd")
    if (text.length == 0) {
      Alert.alert("please enter todo");
      return
    }
    await ref.add({
      title: text,
      complete: false
    })
    console.log(text)
    setText('')
    onDisplayNotification(text)
  }
  console.log(list)

  const onDeletePress = async (itemTitle: string) => {
    // Find the document with the matching title
    const querySnapshot = await ref.where('title', '==', itemTitle).get();

    if (querySnapshot.empty) {
      // Handle the case where no matching document is found
      console.log(`No document with title ${itemTitle} found.`);
      return;
    }

    // Delete the first matching document (assuming titles are unique)
    const docToDelete = querySnapshot.docs[0];
    await docToDelete.ref.delete();
  };

  return (
    <View style = {style.mainContainer}>
      <View style = {{flexDirection: 'row'}}> 
        <TextInput
        value = {text}
        onChangeText = {setText}
        placeholder = "Type Todo here!"
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
      <FlatList
        data = {list}
        renderItem = {({item}) => (
          <View style = {style.card}>
            <Text style = {{color: 'white'}}>{item.title}</Text>
            <Text style = {{color: 'white'}}>{item.complete? 'complete': 'not complete'}</Text>
            <TouchableOpacity
              onPress={() => onDeletePress(item.title)}
              style={{ backgroundColor: 'red', padding: 5, borderRadius: 5 }}
            >
              <Text style={{ color: 'white' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const style=StyleSheet.create({
  card: {
    width: '100%',
    height: 40,
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 10
  },
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
