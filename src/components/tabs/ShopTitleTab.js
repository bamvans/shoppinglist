import React, { Component } from 'react';
import {StyleSheet,
    ScrollView ,
    Text, 
    View
 } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Input, Item, Label, Container, Header, Tab, Tabs, ScrollableTab  } from 'native-base';
import * as firebase from 'firebase';

export default class ShopTitleTab extends React.Component {

    state={listtitle:'', shopList:[], items:[]};


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

    render(){
        return this.state.shopList.map((item,index)=> {
            return (
            <View>
                    <Item stackedLabel>
                        <Label>{this.renderInnerArray(item.items)}</Label>
                        <Input />
                    </Item> 
              </View>
            )

        })
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