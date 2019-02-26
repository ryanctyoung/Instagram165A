import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, Image, FlatList, TouchableHighlight,} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import {openDatabase} from 'react-native-sqlite-storage';
import {database} from "../App.js";
import {styles} from '../StyleSheet.js';
import {Follow,GetCurrUser} from '../App.js'
import * as  ImagePicker  from 'react-native-image-picker';

export {ProfileScreen, EditScreen} 

var db = openDatabase({name:'users.db'});
class ProfileScreen extends Component{

    RetrievePosts(){
      var temp = [];
      db.transaction(function(tx) {

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

    constructor(props) {
      super(props);
        this.state = {
        //get follow amount here
        currUser: GetCurrUser().uid,
        uid: this.props.navigation.state.params.uid,
        user_name : this.props.navigation.state.params.user_name,
        pho_num : this.props.navigation.state.params.pho_num,
        posts:[],
        followers: 0,
        following: 0,   
    }
    this.RetrievePosts();
};   
    render() {
      const handlePress = () => false
     // const {user_name} = this.state
      const{currUser} = this.state
      const {pho_num} = this.state
      const { navigate } = this.props.navigation
      const {user_name} = this.state
      const mail= this.props.navigation.state.params.mail
      const {posts} = this.state
      const {uid} = this.state

    ProfileVariance = () =>
    {
      if(uid == currUser)
      {
        return(
          <View style={styles.wrapper}>
           
           <Button block style={styles.button} onPress={()=> navigate('Edit')} title ={ 'Edit Profile'}/>
           <Button block style={styles.button} title ={ 'Upload'}/>
            <Text style = {styles.bio}> {currUser} </Text>
        </View>
          );
      }
      else
      {
        return(
          <View style={styles.wrapper}>
           
           <Button block style={styles.button} onPress={()=> Follow(uid)} title ={ 'Follow'}/>
            <Text style = {styles.bio}> {currUser} {uid} </Text>
          </View>
          );
      }
    }

    

    PostItem = (postID, photoID) => {


      src = '';
      return(
        <TouchableHighlight onPress={()=>PostNavigate(postID)}>
        <Image source = {src} style={{ width: 300, height: 300 }}/>
        </TouchableHighlight>
        );
    }



    PostNavigate = (postID) => {
      navigate(Post, {postID:postID});
    }



    PostLibrary = () =>
    {
      return(
          <View>
          <FlatList data= {posts} horizontal={true} renderItem = {({item}) => PostItem(item.postID,item.photoID)} />
          </View>
        );
    }



       return (
        <View style={styles.wrapper}>
          <Text> {user_name}'s Profile </Text>
            <Text style={styles.profiledetail}> {this.state.followers} </Text>
           <Text style={styles.profiledetail}> Followers </Text>
           
          <ProfileVariance />
          <PostLibrary/>
          <Text> Hello {user_name}!!! </Text>  
        </View>
      )
    }
}



class EditScreen extends Component{
    constructor(props) {
      super(props);
      this.state = {
        user_name: '',
        email: '',
        phoneNum: ' ',
        user_found: false,
      };
    }
    render() {
    const handlePress = () => false
    strEmpty = (x) => {

      if(x === "" || x ===NULL)
      return true
      else return false;
  }
    const donePress = () => {
    const { user_name } = this.state;
    const { email } = this.state;
    const { phoneNum } = this.state;
    const { navigate } = this.props.navigation;
    const { uid } = currUser;
       
        db.transaction(function(tx) {
          tx.executeSql(
            'UPDATE users SET user_name = ?, email = ?, phoneNum = ? WHERE user_id = ?', [user_name, email, phoneNum, uid],
            (tx, results) => {
              console.log('Results, ' + results.rows.item(0).email);
              if (results.rows.length > 0){
                console.log("user found, "+user_name +email + phoneNum);
                navigate('Profile', { name: user_name, mail: results.rows.item(0).email, phone:results.rows.item(0).phoneNum });
              }
            });
            navigate('Profile', { uid: userTuple.uid, user_name:user_name, pho_num:phone });
        });
    };
    return (
      <View style={styles.wrapper}>
            <Text style={styles.register}>user name</Text>
            <TextInput style={styles.register} placeholder="Please enter your email" onChangeText={user_name => this.setState({ user_name })}/>
            <Text style={styles.register}>Email</Text>
            <TextInput style={styles.register}placeholder="Please enter your email" onChangeText={email => this.setState({ email })}/>
            <Text style={styles.register}>Phone Number</Text>
            <TextInput style={styles.register} placeholder="Please enter your phone number" onChangeText={phoneNum => this.setState({ phoneNum})}/>            
        <Button icon="md-checkmark" iconPlacement="right" onPress={donePress} title="Done"/>
      </View>
    );
  }
}

const profileUI = StyleSheet.create(
{

});