import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, } from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import {createDrawerNavigator} from 'react-navigation';

var db = openDatabase({name:'users.db'});
export default class FeedScreen extends Component{

  
  constructor(props)
  {
    super(props);
  }



  render()
  {
    
    SearchOn = () => {

    this.props.navigation.navigate('Search');
    
    };

    return (
    <View style = {feedUI.wrapper}> 
    <Text style={feedUI.label}>Feed</Text>

    <Button style={feedUI.searchbutton} onPress = {()=> SearchOn()} title='Search'/>

    

    </View>
    );
  }
}





const feedUI = StyleSheet.create(
  {
    wrapper : {
      flex: 1,
      backgroundColor: 'lightblue',
    },

    label:{
      fontSize: 50,
    color: 'yellow',
    textAlign: 'left',
    margin: 10,
    fontWeight: 'bold',
    },

    searchbutton:{
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'yellow',
    fontSize: 30,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
    },
  }
);