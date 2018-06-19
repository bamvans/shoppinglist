import React, { Component } from 'react';
import {StyleSheet,
    ScrollView ,
    Text, 
    View, 
    Image,
    TouchableOpacity
 } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Container, Content, List, ListItem, Left, Body, Right } from 'native-base';
import * as firebase from 'firebase';

export default class EditListScreen extends React.Component {

    state={shopList:[]};

    static navigationOptions = ({navigation}) => {
        const {state, setParams} = navigation;
        return {title: 'Edit Lists',
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

    componentDidMount(){
        const currentUserLoggedIn = firebase.auth().currentUser;
        var uid;
        uid = currentUserLoggedIn.uid; 
        const tis= this;
        console.log(uid);
        firebase.database().ref('lists/'+uid).once("value",(snapshot)=>{
        var arr = [];
            snapshot.forEach(function(data) {
                console.log(data.key);
                console.log(data.val()); 
                arr.push(data.key);
            });
    
            tis.setState({shopList: arr});
            console.log(this.state.shopList)
        });
    }

    renderListItem =()=> {
        return this.state.shopList.map((item,index)=> {
          return (
            <ListItem key={index} avatar>
                <Left>
                    <TouchableOpacity >
                        <MaterialCommunityIcons
                            name='animation'
                            size={25}
                        />
                    </TouchableOpacity>
                </Left>
                <Body>
                    <TouchableOpacity>
                        <Text style={{fontWeight: 'bold', fontSize:25}} onPress={() => this.props.navigation.navigate('EditChoosenListScreen',{listTitle:item})}>{item}</Text>
                    </TouchableOpacity>
                </Body>
                <Right>
                </Right>
            </ListItem>
          );
        });
      }

    render() {
        return (
            <Container>
                <Content>
                    <List>
                        {this.renderListItem()} 
                    </List>
                </Content>
          </Container>
        );
        
    }
}