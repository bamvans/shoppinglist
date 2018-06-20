import React, { Component } from 'react';
import {StyleSheet,
    ScrollView ,
    Text, 
    View
 } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Input, Item, Label } from 'native-base';
import * as firebase from 'firebase';

export default class TitleTab extends React.Component {

    state={s:'', shopList:[], items:[]};


    componentWillMount(){
        this.setState({s:this.props.navigation.state.params.listTitle})
        console.log(this.props.navigation.state.params.listTitle);
    }

      render() {
            return (
                <View>
                    <Item stackedLabel>
                        <Label>{this.state.s}</Label>
                        <Input />
                    </Item> 
                </View>
            );
        }
    }


const styles = StyleSheet.create({
})