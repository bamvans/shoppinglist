/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';
import RootNavigator from './src/components/navigators/rootnavigator';
import * as firebase from 'firebase';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  
   render() {
    return (
      <View style={{flex:1}}>
      <RootNavigator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

/// ".read": "auth != null",
//".write": "auth != null"

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDY0Ns57ZOZoZ79l9-7llF3zF6L-365gx8",
  authDomain: "shoplist-3b423.firebaseapp.com",
  databaseURL: "https://shoplist-3b423.firebaseio.com",
  projectId: "shoplist-3b423",
  storageBucket: "shoplist-3b423.appspot.com",
  messagingSenderId: "406376923021"
};
