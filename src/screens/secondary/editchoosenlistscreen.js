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

    state={listtitle:'', shopList:[], items:[]};

    static navigationOptions = ({navigation}) => {
        const {state, setParams} = navigation;
        return  {title: 'Edit List',
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
        var obj ={};
        var byShop = [];
        //getting items of a list
        firebase.database().ref('lists/'+uid+'/'+this.props.navigation.state.params.listTitle).once('value').then(function(snapshot) {
        snapshot.forEach(function(data) {
            
            obj = {...obj, ...data.val()};
            console.log(data.val());
              byShop.push({ shopName: data.key, data: data.val() });  

            });
            console.log(byShop);
            tis.setState({shopList: convertObjectToArray(byShop)});
            setListItems(tis.state.shopList);
        });
    }

    renderInnerArray =(items = [])=> {
        return items.map((item, index)=>{
            return <Text key={index}> {item.item} </Text>

        });
    }

      render() {
        return this.state.shopList.map((item,index)=> {
            return (
                <View>
                    <Text key= {index}>
                        {this.renderInnerArray(item.items)}
                    </Text>
              </View>
            );
          });
        }
    }

const convertObjectToArray = (shops = []) => {
    
    const mainArr = new Array();
         
        shops.forEach(shop => {
        const innerArr = new Array(); 
        const shopdata = shop.data;
        Object.keys(shop.data).forEach( item=> {
            innerArr.push(shopdata[item]);
                 
        });
            mainArr.push({shop:shop.shopName, items: innerArr });
             
    });
         
    return mainArr;
}

const styles = StyleSheet.create({
})