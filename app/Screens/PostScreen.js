import React, {Component} from 'react';
import {Platform,Image, StyleSheet, Text, View, Button, TextInput,FlatList,} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import {openDatabase} from 'react-native-sqlite-storage';

import * as  ImagePicker  from 'react-native-image-picker';
import GetCurrUser from '../App.js';
import {UserContext} from '../UserContext'

export {PostScreen, CreatePost}
var db = openDatabase({name:'users.db'});
class PostScreen extends Component{
	constructor(props)
	{
		super(props);
		this.state = 
		{
			photos:this.props.navigation.params.photos,
			user_name:this.props.navigation.params.user_name,
		}
	}



	render()
	{

		const Description = () =>
		{
			return (<Text >

			 </Text>);
		}
		return(<View>

		</View>); //
	};

}

class CreatePost extends Component{
	constructor(props)
	{
		super(props);
		this.state = {
			description:'',
			photos:[],
			uid: this.context//this.props.navigation.params.uid,
		};
	}



	render()
	{
		const {goBack} = this.props.navigation;
		const {description} = this.state;
		const {uid} = this.state;
		const SubmitPost = () =>
		{
			
			console.log("PostCreation ");
			db.transaction(function(tx)
				{
					//var temp = GetCurrUser().uid;
					console.log("PostCreation ");
					tx.executeSql("INSERT INTO post(uid,caption) VALUES(?,?) ",[uid,description],
            (tx, results) => 
            {
              if(results.rowsAffected > 0)
              {
                console.log("PostCreation ");
              } 
              console.log("PostCreation ");
            }
            );
      tx.executeSql("SELECT * FROM post ",[],
            (tx, results) => 
            {
              if(results.rows.length > 0)
              {
                console.log(results.rows.item(0).post_id + results.rows.item(0).caption);
              }
              
              
           		 }
            	);
				
			});
			
		}
		return(
			<View>
			<TextInput placeholder = "Description..." onChangeText = {description => this.setState({description})} />
			<Button onPress={() => SubmitPost()} title = "Submit"/>
			</View>
			);
	}
}
CreatePost.contextType = UserContext;


const PostUI = StyleSheet.create()
{

}