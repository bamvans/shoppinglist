import React, { Component } from 'react';
import {StyleSheet,
    ScrollView ,
    Text, 
    View
 } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Input, Item, Label, Container, Header, Tab, Tabs, ScrollableTab  } from 'native-base';
import * as firebase from 'firebase';
import ShopTitleItemTab from '../../components/tabs/ShopTitleItemTab';
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
                <Tabs tabStyle={styles.tabs} renderTabBar={()=> <ScrollableTab style={styles.scrolltab} />}>
                    <Tab activeTabStyle={styles.activeTab} textStyle={styles.texts} heading="Title" tabStyle={styles.tabs}>
                        <TitleTab navigation={this.props.navigation}  />
                    </Tab>
                    <Tab activeTabStyle={styles.activeTab} textStyle={styles.texts} tabStyle={styles.tabs} heading="Shop">
                        <ShopTitleItemTab navigation={this.props.navigation}  />
                    </Tab>
                </Tabs>
            </Container>
                
        );
    }
}

const styles=StyleSheet.create({
    activeTab:{
        backgroundColor: '#BAB8B3'
    },
    texts:{
        color:'white'
    },
    tabs:{
        backgroundColor: '#BAB8B3'
    },
    scrolltab:{
        backgroundColor: '#BAB8B3'
    }
})
