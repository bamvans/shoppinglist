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

export default class ShopTitleTab extends React.Component {

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

    render(){
        return this.state.shopList.map((item,index)=> {
            return (
                <View>
                    <Text>{item.shop}</Text>
                    <Picker
                        selectedValue={this.state.selectedshop}
                        onValueChange={(itemValue, itemIndex) => this.setState({selectedshop: itemValue})}
                        key={index}>
                        {this.loadShops()}
                    </Picker>
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