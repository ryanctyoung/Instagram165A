import React, {Component} from 'react';
import {Platform,Image, StyleSheet, Text, View, Button, TextInput,FlatList,} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import {openDatabase} from 'react-native-sqlite-storage';

import * as  ImagePicker  from 'react-native-image-picker';
import GetCurrUser from '../App.js';

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

		</View>); 
	};

}

class CreatePost extends Component{
	constructor(props)
	{
		super(props);
		this.state = {
			description:'',
			photos:[],
		};
	}



	render()
	{
		const {navigate} = this.props.navigation;
		const SubmitPost = () =>
		{
			db.transaction(function(tx)
				{
					tx.executeSql('INSERT INTO post(timestamp, picture_id, uid) VALUES ()', [0,0,GetCurrUser().uid,],
						(tx, results) => 
						{

						}
						);
				});
			this.props.navigation.goBack();
		}
		return(
			<View>
			<TextInput placeholder = "Description..." onChangeText = {description => this.setState({description:""})} />
			<Button title = "Submit"/>
			</View>
			);
	}
}


const PostUI = StyleSheet.create()
{

}