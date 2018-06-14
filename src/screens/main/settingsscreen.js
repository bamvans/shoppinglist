import React, { Component } from 'react';
import {StyleSheet,
    Text, 
    View, 
    Image,
    TouchableOpacity,
    TextInput, 
    Button,
    CameraRoll,
    TouchableHighlight,
    FlatList,
    Modal,
    ActivityIndicator
 } from 'react-native';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import RNFetchBlob from 'react-native-fetch-blob';

export default class SettingsScreen extends React.Component {
    
  state={disabledb:false,modalVisible: false,photos:[],shopName:"", uploadedImage:"", isUploading: false}
  
//to upload image to firebase storage//////////////////////////////////////////////////////////////////////////////////////////////////////
  getSelectedImages = (currentImage, fname) => {
    
      this.setState({isUploading: true, modalVisible: false});
      const image = currentImage;
      
      const Blob = RNFetchBlob.polyfill.Blob
      const fs = RNFetchBlob.fs
      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
      window.Blob = Blob
    
      let uploadBlob = null
      const imageRef = firebase.storage().ref('images').child(fname+".jpg")
      let mime = 'image/jpg'
      fs.readFile(image, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          // URL of the image uploaded on Firebase storage
          console.log(url);
          this.setState({uploadedImage: url, isUploading:false});
          alert(
            'Image Uploaded',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        })
        .catch((error) => {
          console.log(error);
  
        })  
      }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static navigationOptions = ({navigation}) => {
        const {state, setParams} = navigation;
        return {title: 'Settings Screen',
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

onClick=()=>{
firebase.database().ref('shops/').push({
      shop: this.state.shopName,
      image: this.state.uploadedImage,
    });
    alert(
      'Success',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
}

_handleButtonPress = () => {
  CameraRoll.getPhotos({
      first: 500,
      assetType: 'photos',
      
    })
    .then(r => {
      this.setState({ photos: r.edges, modalVisible: true, renderedPhotos: r.edges.slice(r.edges.length-20), currentPhotoCursor: 20 });
      console.log(r);
      const currentBatch = this.state.photos.slice(all-this.state.currentPhotoCursor);

    })
    .catch((err) => {
       //Error Loading Images
    });
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

     render() {
        return (
          <View>
            <View style={{width: 50, height: 15}}></View>
            <Text style={{fontWeight:'bold'}}>Please select Image of Shop to Upload:</Text>
            <Button title="Select Image" onPress={()=>{this._handleButtonPress() }} />
              {(this.state.modalVisible)? (<Modal
                      animationType="slide"
                      transparent={false}
                      visible={this.state.modalVisible}
                      onRequestClose={() => {this.setModalVisible(!this.state.modalVisible)
                  }}>
                  
                  <FlatList
                   numColumns={3}
                      data={this.state.photos}
                      renderItem={({item, separators}) => (
                        <TouchableHighlight
                          onPress={()=>{this.getSelectedImages(item.node.image.uri, item.node.timestamp)}}
                          onShowUnderlay={separators.highlight}
                          onHideUnderlay={separators.unhighlight}>    
                              <Image
                                  key={item.node.image.timestamp}
                                  style={styles.image} 
                                  source={{ uri: item.node.image.uri }}
                                />
                        </TouchableHighlight>
                      )}
                    />    

                </Modal>): <View/> }

              { (this.state.isUploading)?<ActivityIndicator size="large" />: <View/> } 
                 <View style={{width: 50, height: 15}}></View>
                 <Text style={{fontWeight:'bold'}}>Shop Name</Text>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 5}}
                onChangeText={(text) => this.setState({shopName:text})}
                value={this.state.text}
              />  
              <View style={{width: 50, height: 15}}></View>
              <Button
                  onPress={()=>{this.onClick()}}
                  title="Add"
                  style={{marginTop:5}}
                />
          </View>
        );
      }
    }

    const styles = StyleSheet.create({
      image: {
          width: 100,
          height: 100,
          margin: 10,
      },
    });
    


    //If true : else show view
    //{ (this.state.isUploading)?<ActivityIndicator size="large" />: <View/> }
