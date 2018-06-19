import React, { Component } from 'react';
import {StyleSheet,
    ScrollView ,
    Text, 
    View
 } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Input, Item, Label, Container, Header, Tab, Tabs, ScrollableTab  } from 'native-base';
import * as firebase from 'firebase';
import ItemsTab from '../../components/tabs/ItemsTab';
import ShopTitleTab from '../../components/tabs/ShopTitleTab';
import TitleTab from '../../components/tabs/TitleTab';

export default class EditChoosenListScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {state, setParams} = navigation;
        return  {title: 'Edit List',
        };
    }

    render() {
        return (
            <Container>
                <Tabs tabStyle={{backgroundColor: '#BAB8B3'}} renderTabBar={()=> <ScrollableTab style={{backgroundColor: '#BAB8B3'}} />}>
                    <Tab activeTabStyle={{backgroundColor: '#BAB8B3'}} textStyle={{color:'white'}} heading="Title" tabStyle={{backgroundColor: '#BAB8B3'}}>
                        <TitleTab navigation={this.props.navigation}  />
                    </Tab>
                    <Tab activeTabStyle={{backgroundColor: '#BAB8B3'}} textStyle={{color:'white'}} tabStyle={{backgroundColor: '#BAB8B3'}} heading="Shop">
                        <ShopTitleTab navigation={this.props.navigation}  />
                    </Tab>
                    <Tab activeTabStyle={{backgroundColor: '#BAB8B3'}} textStyle={{color:'white'}} tabStyle={{backgroundColor: '#BAB8B3'}} heading="Items">
                        <ItemsTab navigation={this.props.navigation}  />
                    </Tab>
                </Tabs>
            </Container>
                
        );
    }
}

