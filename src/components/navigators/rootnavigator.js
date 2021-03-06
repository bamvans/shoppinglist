import React, { Component } from 'react';
import {Platform, StatusBar} from 'react-native';
import {StackNavigator, DrawerNavigator, DrawerItems, SafeAreaView} from 'react-navigation';

//Screens//////////////////////////////////////////////////////////////////////////////////
import EditListScreen from '../../screens/EditingList/editlistscreen';
import NewListScreen from '../../screens/AddingList/newlistscreen';
import SettingsScreen from '../../screens/Settings/settingsscreen';
import SharedListScreen from '../../screens/SharingList/sharedlistscreen';
import AddListScreen from '../../screens/AddingList/addlistscreen';
import LoginScreen from '../../screens/authentication/loginscreen';
import LogoutScreen from '../../screens/authentication/logoutscreen';
import ListCreatedScreen from '../../screens/AddingList/listcreatedscreen';
import EditChoosenListScreen from '../../screens/EditingList/editchoosenlistscreen';
//////////////////////////////////////////////////////////////////////////////////////////

import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import {StyleSheet,
        ScrollView ,
        Text, 
        View, 
        Image } from 'react-native';

const CustomDrawerContentComponent = (props) => (
    <ScrollView style={{backgroundColor:'#BAB8B3'}}>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <Image style={{
          height:220,
          width:250,
          alignSelf:'center',
          backgroundColor: 'white',}} 
          source={require('../../assets/images/shopping_cart_red.png')}/>
        <DrawerItems {...props}/>
      </SafeAreaView>
    </ScrollView>
  );

  const LoginNavigator = StackNavigator({
    LoginScreen: {
        screen: LoginScreen
    }
}, {
    initialRouteName: 'LoginScreen',
    navigationOptions: () => ({
        headerTintColor: 'white',
        headerTitleStyle: {
            color: 'white',
        },
        headerStyle: {
            backgroundColor: '#BAB8B3'
        }
    })
});

const InitialListNavigator = StackNavigator({
    NewListScreen: {
        screen: NewListScreen
    },
    AddListScreen:{
        screen:AddListScreen
    },
    ListCreatedScreen:{
        screen:ListCreatedScreen
    },
}, {
    initialRouteName: 'NewListScreen',
    navigationOptions: () => ({
        headerTintColor: 'white',
        headerTitleStyle: {
            color: 'white'
        },
        headerStyle: {
            backgroundColor: '#BAB8B3'
        }
    })
});

const EditListNavigator = StackNavigator({
    EditListScreen: {
        screen: EditListScreen
    },
    EditChoosenListScreen:{
        screen:EditChoosenListScreen
    },
}, {
    initialRouteName: 'EditListScreen',
    navigationOptions: () => ({
        headerTintColor: 'white',
        headerTitleStyle: {
            color: 'white'
        },
        headerStyle: {
            backgroundColor: '#BAB8B3'
        }
    })
});
const SharedListNavigator = StackNavigator({
    SharedListScreen: {
        screen: SharedListScreen
    }
}, {
    initialRouteName: 'SharedListScreen',
    navigationOptions: () => ({
        headerTintColor: 'white',
        headerTitleStyle: {
            color: 'white'
        },
        headerStyle: {
            backgroundColor: '#BAB8B3'
        }
    })
});

const SettingsStackNavigator = StackNavigator({
    SettingsScreen: {
        screen: SettingsScreen
    }
}, {
    initialRouteName: 'SettingsScreen',
    navigationOptions: () => ({
        headerTintColor: 'white',
        headerTitleStyle: {
            color: 'white'
        },
        headerStyle: {
            backgroundColor: '#BAB8B3'
        }
    })
});

const LogOutStackNavigator = StackNavigator({
    LogoutScreen: {
        screen: LogoutScreen
    }
}, {
    initialRouteName: 'LogoutScreen',
    navigationOptions: () => ({
        headerTintColor: 'white',
        headerTitleStyle: {
            color: 'white'
        },
        headerStyle: {
            backgroundColor: '#BAB8B3'
        }
    })
});


const DrawerStack = DrawerNavigator(
    {
        Create: {
            screen: InitialListNavigator,
        },
        Edit: {
            screen: EditListNavigator
        },
        Shared: {
            screen: SharedListNavigator
        },
        Settings: {
            screen: SettingsStackNavigator
        },
        Logout: {
            screen: LogOutStackNavigator
        }
    }, 
    {
        drawerWidth: 300,
        contentOptions: {
            activeTintColor: 'white',
            inactiveTintColor: 'white',
            activeBackgroundColor: '#888785',
            inactiveBackgroundColor: '#BAB8B3',
    },
    contentComponent: CustomDrawerContentComponent,
});

const MainStack = StackNavigator(
    {
        Login: {
            screen: LoginNavigator,
            navigationOptions: () => ({
            })
        },
        
        Drawer: {
            screen: DrawerStack,
        },
}, {
    
    headerMode: 'none',
    navigationOptions: () => ({
        headerTitleStyle: {
            color: 'white'
        },
        headerStyle: {
            backgroundColor: '#BAB8B3'
        },
    })
});


export default class RootNavigator extends React.Component {
    render() {
        return (<MainStack navigation={this.props.navigation} style={{backgroundColor: '#888785'}}/>);
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'white',
    },
});