import React, { Component } from 'react';
import {StyleSheet,
    ScrollView ,
    View,
    Modal,
    TouchableOpacity
 } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Card, CardItem, Left, Body, Text  } from 'native-base';
import * as firebase from 'firebase';
import Swipeout from 'react-native-swipeout';
import PopupDialog, { DialogTitle, SlideAnimation } from 'react-native-popup-dialog';
import pp from '../../components/popupdialog';


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

     }

    renderInnerArray =(items = [],shopN)=> {
        var swipeoutBtns = [
            {
                text:'Edit',
                type:'primary',
                onPress: () => {this.renderPopUp()},

            },
            {
                text: 'Delete',
                type:'delete'
            },
        ];
        return items.map((item, index)=>{
            console.log(item);
            return   <Swipeout right={swipeoutBtns} sensitivity='10'>
                        <View  style={{height:130}}>
                            <Card>
                                <CardItem header bordered>
                                    <Text>{shopN}</Text>
                                </CardItem>
                                <CardItem bordered>
                                    <Left>
                                        <Body>
                                            <Text>{item.item}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                            </Card>
                        </View>
                    </Swipeout>
        });
    }

    renderPopUp=()=>{
        console.log('rr');
        return(
            <View><PopupDialog dialogStyle={{width:20, height:36, overlayBackgroundColor:'pink'}}
            ref={(popupDialog) => { this.popupDialog = popupDialog; }}
            dialogTitle={<DialogTitle title="Dialog Title" />}
            dialogAnimation={slideAnimation}
            >
                <View>
                <Text>Hello</Text>
                </View>
            </PopupDialog>
            </View>
        )}
    
    

    render(){
        return this.state.shopList.map((item,index)=> {
            return (
                <View style={styles.mainView}>
                        {this.renderInnerArray(item.items,item.shop)} 
                </View>
            )
        });
    }

}
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
  });

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
    mainView:{
        flexDirection: 'column',
        height:130,
    },
    secondaryView:{
        justifyContent: 'center', 
        alignItems: 'center'
    }
})