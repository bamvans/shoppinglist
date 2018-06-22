import React, { Component } from 'react';
import {StyleSheet,
    ScrollView ,
    Text, 
    View
 } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Input, Item, Label } from 'native-base';
import * as firebase from 'firebase';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';

export default class PopUpDialog extends React.Component {

    render(){
        return(
            <PopupDialog
                dialogTitle={<DialogTitle title="Dialog Title" />}
                ref={(popupDialog) => { this.popupDialog = popupDialog; }}
            >
            </PopupDialog>
        )
    }
}