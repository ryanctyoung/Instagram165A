import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, } from 'react-native';
import{SearchBar,} from 'react-native-elements';
import {openDatabase} from 'react-native-sqlite-storage';


export default class FeedScreen extends Component{

  
  constructor(props)
  {
    super(props);
    this.state = {search: '',}
  }

  updateSearch = search => {
    this.setState({ search });
  };


  render()
  {
    const { search } = this.state;

    return (
    <View style = {feedUI.wrapper}> 
    <Text style={feedUI.label}>Feed</Text>

    <SearchBar
        placeholder="User Search"
        onChangeText={this.updateSearch}
        value={search}
      />


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
    }
  }
);