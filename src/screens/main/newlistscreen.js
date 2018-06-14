import React, { Component } from 'react';
import {StyleSheet,
    Text, 
    TouchableOpacity
 } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail } from 'native-base';
import * as firebase from 'firebase';

export default class NewListScreen extends React.Component {

  state = {items: [],  shopsArray: [],listTitle:''};

  //multiple shops to one list
  addShop =(pickedShop)=> {
    this.state.shopsArray.push(pickedShop);
    this.props.navigation.navigate('AddListScreen', {shopsArrays: this.state.shopsArray, currentShop: pickedShop});
  }

    static navigationOptions = ({navigation}) => {
        const {state, setParams} = navigation;
        return  {title: 'Please Choose a Shop',
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


    renderListItem =()=> {
      return this.state.items.map((item,index)=> {
        return (
          <ListItem key={index} avatar>
            <Left>
              <TouchableOpacity  onPress={() => this.props.navigation.navigate('AddListScreen')}>
                <Thumbnail square size={80}  style={styles.imagess} source={{uri:item.image}} />
              </TouchableOpacity>
            </Left>
            <Body>
              <TouchableOpacity  onPress={()=>{this.addShop(item.shop)}}>
                <Text style={{fontWeight: 'bold'}} >{item.shop}</Text>
              </TouchableOpacity>
            </Body>
            <Right>
            </Right>
          </ListItem>
        );
      });
    }

    componentDidMount(){
    const tis= this;
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

const styles = StyleSheet.create({
    imagess: {
        resizeMode:'contain',
    },
});