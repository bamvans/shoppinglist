import React, { Component } from 'react';
import {StyleSheet,
    Text, 
    View, 
    TouchableOpacity,
    FlatList,
    Button
 } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { List, ListItem, Left, Body, Right, Item, Input } from 'native-base';
import * as firebase from 'firebase';
import { getTitle, setTitle, getListItems, setListItems} from '../../components/storage/constants';

export default class AddListScreen extends React.Component {

    state={items:[], text: '', title:'', userId:'', shopList: [], loading: false};

    constructor(props){
        super(props)
        state = {title: getTitle(), shopList:getListItems()}
    }

    static navigationOptions = ({navigation}) => {
        const {state, setParams} = navigation;
        return  {title: 'Enter Details',
       
        };
    }


addItemsToBasket=()=>{
    const currentUserLoggedIn = firebase.auth().currentUser;
    var uid;
    uid = currentUserLoggedIn.uid; 
    const tis= this;
    const current=firebase.database().ref('lists/'+uid).child(this.state.title).child(this.props.navigation.state.params.currentShop).push({
          item: this.state.text,
        }).key;
        alert(
          'Success',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )

        console.log(current);
        setTitle(this.state.title);
        var obj ={};
        var byShop = [];
        //getting items of a list
        firebase.database().ref('lists/'+uid+'/'+this.state.title).once('value').then(function(snapshot) {
        snapshot.forEach(function(data) {
            
            obj = {...obj, ...data.val()};
            console.log(data.val());
              byShop.push({ shopName: data.key, data: data.val() });  

            });
            // run the ting
            console.log(byShop);
            tis.setState({shopList: convertObjectToArray(byShop)});
            setListItems(tis.state.shopList);
        });
   
}

renderListItem =(items=[])=> {
    return items.map((item,index)=> {
      return (
        <ListItem key={index} avatar>
            <Left>
                <MaterialCommunityIcons
                    name='animation'
                    size={20}
                /><Text> { item.item } </Text>
            </Left>
            <Body>
            </Body>
            <Right>
            </Right>
      </ListItem>
      )
    });
}

componentDidMount(){
    this.setState({ title: getTitle() });
    this.setState({ shopList: getListItems() });
}


///FlatList Components/////////////////////////////////////////////////////////////////////////////////////////////////
renderSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "99%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  renderHeader = () => {
    return ( <Text style={styles.listTitle}>{this.state.title}</Text>)
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };  
///FlatList Components/////////////////////////////////////////////////////////////////////////////////////////////////

    render(){
        console.log(this.props.navigation.state.params.shopsArrays);
        return(
            <View style={styles.mainView}>
                <View style={styles.mainViewtwo}>
                    <Item regular style={styles.textRoundedtitle}>
                        <Input placeholder='List Title' onChangeText ={(values) => this.setState({title:values})} value={this.state.title}/>
                    </Item>
                    
                </View>
                <View style={styles.secondView}>
                    <Item regular style={styles.textRounded}>
                        <Input placeholder='Add Item' onChangeText ={(values) => this.setState({text:values})} value={this.state.text}/>
                    </Item>
                    <TouchableOpacity  onPress={()=>this.addItemsToBasket()}>
                        <MaterialCommunityIcons name="plus-box" style={{fontSize:55}}></MaterialCommunityIcons>
                    </TouchableOpacity>
                </View>
                <View style={styles.thirdView}>
                    <FlatList data={this.state.shopList}
                        keyExtractor={item=>item.shop}
                        listKey="2.1"
                        renderItem={({item}) =>
                            <View><Text style={styles.shopTitle}>
                           {item.shop}</Text>
                                <List>
                                {this.renderListItem(item.items) }

                                 </List>
                            </View>
                        }
                        ItemSeparatorComponent={this.renderSeparator}
                        ListHeaderComponent={this.renderHeader}
                        ListFooterComponent={this.renderFooter}>
                    </FlatList>
                </View>
                <View style={styles.fourthView}>
                    <Button style={styles.saveButton}  onPress={()=> this.props.navigation.navigate('ListCreatedScreen', {listtitle:this.state.title})}
                        title="SAVE LIST"
                        >
                    </Button>
                </View>
            </View>
        );
    }
}

const convertObjectToArray = (shops = []) => {
    
   const mainArr = new Array();
    
        shops.forEach(shop => {
        const innerArr = new Array(); 
        Object.keys(shop.data).forEach( item=> {
            innerArr.push(shop.data.items);
            console.log(item);
        });
        mainArr.push({shop:shopName, items: innerArr });
    });

  return mainArr;
}
  
const styles = StyleSheet.create({
   mainView:{
    display:'flex',
    flex: 1, 
    flexDirection: 'column',
   },
   secondView:{
    display: 'flex',   
    flexDirection: 'row',
    width: "100%", 
    height: 50
   },
   thirdView:{
    flex: 2, 
    flexDirection: 'row',
    width: "100%", 
    height: 50,
    marginTop:"2%"
   },
   mainViewtwo:{
    display: 'flex',   
    flexDirection: 'row',
    width: "100%", 
    height: 50
   },
   textRounded:{
    width: 307, 
    height: "100%",
    backgroundColor:'white',
    marginTop:5
   },
   textRoundedtitle:{
    width: "100%", 
    height: "100%",
    backgroundColor:'white',
    marginTop:5
   },
   listTitle:{
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft:1
   },
   shopTitle:{
    marginLeft:11,
    fontSize: 20,
   },
   fourthView:{
    flex: 1, 
    flexDirection: 'column',
    width: "100%",
    height:75,
    justifyContent: 'flex-end',
    marginBottom:5,
   },
   saveButton:{
    width:"98%",
    height:80
   }
});