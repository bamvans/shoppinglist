import React, { Component } from 'react';
import {StyleSheet,
    ScrollView ,
    Text, 
    View, 
    Image,
    TouchableOpacity
 } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

export default class SharedListScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {state, setParams} = navigation;
        return {
            headerLeft:(
                <TouchableOpacity
               onPress={() => {
                navigation.openDrawer()
           }}>
               <Icon
                   name='menu'
                   size={30}
                   color='white'
                   style={{
                   marginLeft: 12
               }}/>
                </TouchableOpacity>
            ),
        };
    }

    render() {
        return (
            <Text>Shared List Screen</Text>
        )
    }
}
