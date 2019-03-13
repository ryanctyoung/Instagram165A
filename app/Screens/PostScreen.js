import React, {Component} from 'react';
import {Platform,Image, StyleSheet, Text, View, Button, TextInput,FlatList,} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import {openDatabase} from 'react-native-sqlite-storage';

import * as  ImagePicker  from 'react-native-image-picker';
import GetCurrUser from '../App.js';
import {UserContext} from '../UserContext'
import { RkButton,RkText,RkCard,RkTheme, } from 'react-native-ui-kitten';
import {styles} from '../StyleSheet'

export {PostScreen, CreatePost, PostItem} //also export 
var db = openDatabase({name:'users.db'});




  function RetrievePosts()
  {
    var temp = [];
      db.transaction(function(tx) {
        tx.executeSql(
          'SELECT',[],
          (tx,results) =>{

          }
          );
        
        for(let i = 0; i < results.rows.length; ++i)
        {
            temp.push(results.rows.item[i]);
        }

        
      });
      this.setState({
        posts:temp
      });
  }

  const PostItem =(item) =>
  {
  	// post: {post_ID, caption, userID} Comments: {pid, cid, userID, text} Likes: {pid, userID}
  	const {caption} = item
      src = './test.png';
      return(
        <View>
        <Text style={{fontSize:40, color:'white'}}>{caption} </Text>
        
        </View>
        );
    /*const likes = 0;
    const comments = 0;
    const {caption} = item;
    const imagePost = " ";
    const Username = " ";
    const profilePicture = " ";
  return (
    <RkCard>  
            <View rkCardHeader={true}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={profilePicture} style={styles.avatar} />
                <View style={{}}>
                  <RkText rkType='header'>Username</RkText>
                </View>
              </View>
              <RkButton rkType='clear'>
                <Icon style={styles.dot} name="circle" />
                <Icon style={styles.dot} name="circle" />
                <Icon style={styles.dot} name="circle" />
              </RkButton>
            </View>
            <Image rkCardImg={true} source={imagePost} />
            <View rkCardContent={true}>
              <RkText rkType='hero'>
                caption
              </RkText>
            </View>
            <View rkCardFooter={true} style={styles.footer}>
              <RkButton rkType='clear link accent'>
                <Icon name="heart" style={likeStyle} />
                <RkText rkType='accent'>likes</RkText>
              </RkButton>
              <RkButton rkType='clear link'>
                <Icon name="comment-o" style={iconButton} />
                <RkText rkType='hint'>comments</RkText>
              </RkButton>
              <RkButton rkType='clear link'>
                <Icon name="send-o" style={iconButton} />
                <RkText rkType='hint'></RkText>
              </RkButton>
            </View>
          </RkCard>

  );*/
  }

  
  
class PostScreen extends Component{
	constructor(props)
	{
		super(props);
		this.state = 
		{
			//photos:this.props.navigation.params.photos,
			//user_name:this.props.navigation.params.user_name,
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
	static contextType = UserContext;
	constructor(props,context)
	{
		super(props,context);
		this.state = {
			description:'',
			photos:[],
			uid: this.context.user.uid,
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
					tx.executeSql("INSERT INTO post(user_id,caption) VALUES(?,?) ",[uid,description],
            (tx, results) => 
            {
              if(results.rowsAffected > 0)
              {
                console.log("PostCreation ");
              } 
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
			<View style = {PostUI.creation}>
			<TextInput style = {{color:'white'}} placeholder = "Description..." onChangeText = {description => this.setState({description})} />
			<Button onPress={() => SubmitPost()} title = "Submit"/>
			</View>
			);
	}
}
CreatePost.contextType = UserContext;


const PostUI = StyleSheet.create(
{
	creation: {
		marginTop: 40,
		justifyContent: 'center',
	},
});