import React, { Component } from 'react';
import {StyleSheet,
    Text, 
    View, 
    TouchableOpacity,
    Image
 } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { List, ListItem, Left, Body, Right, Item, Input } from 'native-base';
import * as firebase from 'firebase';
import {images} from '../../assets';

export default class ListCreatedScreen extends React.Component {

    state={};

    static navigationOptions = ({navigation}) => {
        const {state, setParams} = navigation;
        return  {title: 'List Created',
            headerLeft:(
                <TouchableOpacity
               onPress={() => {
                navigation.openDrawer()
           }}>
               <MaterialCommunityIcons
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
            <View style={styles.mainView}>
                <Image
                    source={images.clipboard}
                    style={styles.mainImage}
                />
                <Text>List {this.props.navigation.state.params.listtitle} Created</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainImage:{
        width:'65%',
        height:'80%'
    }
})