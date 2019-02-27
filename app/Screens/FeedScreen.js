import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, Image, TouchableHighlight,FlatList} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import {createDrawerNavigator} from 'react-navigation';
import * as  ImagePicker  from 'react-native-image-picker';

var db = openDatabase({name:'users.db'});
export default class FeedScreen extends Component{

  RetrievePosts()
  {
    var temp = [];
      db.transaction(function(tx) {
        tx.executeSql(
          '',[],
          (tx,results) =>{

          }
          );
        /*
        for(let i = 0; i < results.rows.length; ++i)
        {
            temp.push(results.rows.item[i]);
        }

        */
      });
      this.setState({
        posts:temp
      });
  }

  constructor(props)
  {
    super(props);
    this.state = {
      posts:[],
    };

  }

  componentDidMount()
    {
      //this.RetrievePosts();
    }


  render()
  {
    const{posts} = this.state
    const PostItem = (item) => {
      src = "";

      return(<TouchableHighlight > 
      <Image source = {src} />
      </TouchableHighlight>);
    }
    const FeedPosts = () =>{

      return (
        <View>
        <FlatList data = {posts} renderItem = {(item)=>PostItem(item)} />
        </View>
        );
    }
    
    SearchOn = () => {

    this.props.navigation.navigate('Search');
    
    };

    return (
    <View style = {feedUI.wrapper}> 
    <Text style={feedUI.label}>Feed</Text>
    <FeedPosts />
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