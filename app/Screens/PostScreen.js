import React, {Component} from 'react';
import {Platform,Image, StyleSheet, Text, View, Button, TextInput,FlatList,} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import {openDatabase} from 'react-native-sqlite-storage';

import * as  ImagePicker  from 'react-native-image-picker';

var db = openDatabase({name:'users.db'});
export default class PostScreen extends Component{
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
		<View>
		
		</View>
	};
}

const PostUI = StyleSheet.create()
{

}