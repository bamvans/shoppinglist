import React, { Component } from 'react';
import {StyleSheet,
    ScrollView ,
    Text, 
    View, 
    Image,
    TouchableOpacity,
    FlatList
 } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Container, Content, List, ListItem, Left, Body, Right } from 'native-base';
import * as firebase from 'firebase';

export default class EditChoosenListScreen extends React.Component {

    state={listtitle:'', shopList:[]};

    static navigationOptions = ({navigation}) => {
        const {state, setParams} = navigation;
        return  {title: this.props.navigation.state.params.listTitle,
       
        };
    }



    componentDidMount(){
        this.setState({listtitle:this.props.navigation.state.params.listTitle});
        console.log(this.props.navigation.state.params.listTitle);
        const currentUserLoggedIn = firebase.auth().currentUser;
        var uid;
        uid = currentUserLoggedIn.uid; 
        const tis= this;
        console.log(uid);
        firebase.database().ref('lists/'+uid+'/'+this.props.navigation.state.params.listTitle).once("value",(snapshot)=>{
            var obj ={};
            snapshot.forEach(function(data) {
                console.log(data.key);
                console.log(data.val()); 
                obj = { ...obj, ...data.val()}
            });
            console.log(obj);
            tis.setState({shopList: convertObjectToArray(obj)});
            console.log(this.state.shopList)
    
        });
    }

      render() {
        return this.state.shopList.map((item,index)=> {
            return (
                <View>
                    <Text>{item.items}</Text>
              </View>
            );
          });
        }
    }

const convertObjectToArray = (obj) => {
    
    const mainArr = new Array();
     
    Object.keys(obj).forEach(shop => {
         const innerArr = new Array(); 
         Object.keys(obj[shop]).forEach( item=> {
             innerArr.push(obj[shop][item]);
         });
         mainArr.push({shop:shop, items: innerArr });
     });
 
   return mainArr;
 }

 const styles = StyleSheet.create({
 })