import React, { Component } from 'react';
import {StyleSheet,
    ScrollView ,
    Text, 
    View, 
    Image,
    TouchableOpacity, 
    ActivityIndicator,
    Button,
    TextInput,
    KeyboardAvoidingView 
 } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import * as firebase from 'firebase';
import {images} from '../../assets';

export default class LoginScreen extends React.Component {

    state = {
        email: '',
        password: '',
        authenticating: false,
        user: null,
        error: '',
    }

    static navigationOptions = ({navigation}) => {
        const {state, setParams} = navigation;
        return { title: 'Login',
            headerLeft:(
               <Icon
                   name='login'
                   size={30}
                   color='white'
                   style={{
                   marginLeft: 12
               }}/>
            ),
        };
    }
    
    componentWillMount(){
      firebase.initializeApp(config);
        this.setState({
          authenticating: true,
        });
      if (this.state.authenticating) {
        return (
          <View style={styles.form}>
            <ActivityIndicator size='large' />
          </View>
        )
      }
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
              this.props.navigation.navigate('Create');
          } else {
              if (this.props.navigation.state.params !== undefined) {
           
                  this.props.navigation.navigate('Create');
              }else{
                  this.setState({authenticating: false, user:null});
              }
          }
        });
  }
    

  onPressSignIn() {
    this.setState({
      authenticating: true,
    });

    const _this=this;
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => _this.setState({
        authenticating: false,
        user,
        error: '',
      }))
      .catch(() => {
        // Login was not successful
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => _this.setState({
            authenticating: false,
            user,
            error: '',
          }))
          .catch(() => _this.setState({
            authenticating: false,
            user: null,
            error: 'Authentication Failure',
          }))
      })

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
      }, error => {
        console.error('Sign Out Error', error);
      });
  }

  renderCurrentState() {
    if (this.state.authenticating) {
      return (
        <View style={styles.form}>
          <ActivityIndicator size='large' />
        </View>
      )
    }

    if (this.state.user !== null) {
        this.props.navigation.navigate('Drawer')
    }

    return (
      <View style={styles.form}>
        <Image style={{
          height:220,
          width:220,
          alignSelf:'center',}} 
          source={images.cart}/>
        <KeyboardAvoidingView style={styles.form2} behavior="padding" enabled>
          <TextInput
            placeholder='Enter your email...'
            label='Email'
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            placeholder='Enter your password...'
            label='Password'
            secureTextEntry
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <Button title="Log In" onPress={() => this.onPressSignIn()}/>
          <Text>{this.state.error}</Text>
        </KeyboardAvoidingView>
      </View>
    )

  }

  render() {
    return (
      
      <View style={styles.container}>
        {this.renderCurrentState()}
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
    display:"flex",
    flex:1
  },
  form2: {
    marginTop:50
  }
});


// Initialize Firebase
const config = {
    apiKey: "AIzaSyDY0Ns57ZOZoZ79l9-7llF3zF6L-365gx8",
    authDomain: "shoplist-3b423.firebaseapp.com",
    databaseURL: "https://shoplist-3b423.firebaseio.com",
    projectId: "shoplist-3b423",
    storageBucket: "shoplist-3b423.appspot.com",
    messagingSenderId: "406376923021"
  };
  