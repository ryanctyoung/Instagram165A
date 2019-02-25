import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, } from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import {openDatabase} from 'react-native-sqlite-storage';
import {database} from "../App.js";
import {styles} from '../StyleSheet.js';

export {ProfileScreen, EditScreen} 

var db = openDatabase({name:'users.db'});
class ProfileScreen extends Component{
    constructor(props) {
      super(props);
        this.state = {
        //get follow amount here
        uid: this.props.navigation.state.params.uid,
        user_name : this.props.navigation.state.params.user_name,
        pho_num : this.props.navigation.state.params.pho_num,
        followers: 0,
        following: 0,   
    }
};   
    render() {
      const handlePress = () => false
     // const {user_name} = this.state
      const {pho_num} = this.state
      const { navigate } = this.props.navigation
      const {user_name} = this.state
      const mail= this.props.navigation.state.params.mail
      
      const {uid} = this.state

    navigatePress = () => 
    {
      if(uid == currUser)
      {
        navigate('Edit')
      }
      else //follower query HERE
      {
        //INSERT (currUser,today's date) into Users u.follow where SELECT Users u where u.uid == uid
        db.transaction(function(tx) {
          tx.executeSql('INSERT INTO followers (followerID, followedID) VALUES (?,?)', [userTuple.uid, uid])  
          });

        }
    }
       return (
        <View style={styles.wrapper}>
          <Text> {user_name}'s Profile </Text>
            <Text style={styles.profiledetail}> {this.state.followers} </Text>
           <Text style={styles.profiledetail}> Followers </Text>
           
           <Button block style={styles.button} onPress={navigatePress} title ={ uid == currUser ? 'Edit Profile' : 'Follow'}/>
            <Text style = {styles.bio}> {pho_num} </Text>
   
          <Text> Hello {user_name}!!! </Text>    
           <Text> my phone number is {pho_num}</Text>   
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