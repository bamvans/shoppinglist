import React, { Component } from 'react';
import {StyleSheet,
    ScrollView ,
    Text, 
    View, 
    Image,
    TouchableOpacity, 
    ActivityIndicator,
    Button,
    TextInput
 } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import * as firebase from 'firebase';
import {images} from '../../assets';

export default class LogoutScreen extends React.Component {

    state = {
        email: '',
        password: '',
        authenticating: false,
        user: null,
        error: '',
    }

    static navigationOptions = ({navigation}) => {
        const {state, setParams} = navigation;
        return { title: 'Logout',
            headerLeft:(
               <Icon
                   name='logout'
                   size={30}
                   color='white'
                   style={{
                   marginLeft: 12
               }}/>
            ),
        };
    }

 
  onPressLogOut() {
    firebase.auth().signOut()
      .then(() => {
        this.setState({
          email: '',
          password: '',
          authenticating: false,
          user: null,
        })
        
        alert(
            'Loged Out',
            [
              {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
            ],
            { cancelable: false }
          )
          this.props.navigation.navigate('Login');
      }, error => {
        console.error('Sign Out Error', error);
      });
  }
   
  render() {
    return (
        <View style={styles.form}>
          <Text>Logged In</Text>
          <Button title="Log Out" onPress={() => this.onPressLogOut()}/>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  form: {
    flex: 1
  }
});