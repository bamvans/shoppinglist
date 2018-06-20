import React, { Component } from 'react';
import {StyleSheet,
    ScrollView ,
    Text, 
    View,
    Picker
 } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Input, Item, Label, Container, Header, Tab, Tabs, ScrollableTab  } from 'native-base';
import * as firebase from 'firebase';

export default class ShopTitleItemTab extends React.Component {

    state={listtitle:'', shopList:[], items:[], selectedshop:''};


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

        
        firebase.database().ref("shops").once("value",(snapshot)=>{
        var arr = [];
        snapshot.forEach(function(data) {
            
             // let items = Object.values(data);
              console.log(data.val()); 
              arr.push(data.val());
             // this.setState({items});
            });
    
            tis.setState({items: arr});
        });
     }

    loadShops=()=> {
        return this.state.items.map((item,index)=> {
          return <Picker.Item key={index} label={item.shop} value={item.shop} />
        })
    }

    renderInnerArray =(items = [])=> {
        return items.map((item, index)=>{
            return <Text key={index}> {item.item} </Text>

        });
    }

    render(){
        //Value is in selected shop + number 0
        return this.state.shopList.map((item,index)=> {
            return (
                <View style={{                    
                    flexDirection: 'column',
                    borderWidth:3,
                    borderColor:'pink',
                    height:130,
                    borderBottomColor:'pink'
                }}>
                    <Text>{item.shop}</Text>
                    <Picker 
                        selectedValue={this.state["selectedShop"+index]}
                        onValueChange={(itemValue, itemIndex) =>{ this.setState({ ["selectedShop"+index]: itemValue  });}}
                        key={index}>
                        {this.loadShops()}
                    </Picker>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Item stackedLabel>
                            <Label>{this.renderInnerArray(item.items)}</Label>
                            <Input />
                        </Item> 
                    </View>
                </View>
            )
        });
    }
}

const convertObjectToArray = (shops = []) => {
    
    const mainArr = new Array();
         const tis=this;
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