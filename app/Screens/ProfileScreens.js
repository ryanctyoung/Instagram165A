import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, Image, FlatList, TouchableHighlight,ScrollView} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import {openDatabase} from 'react-native-sqlite-storage';
import {database} from "../App.js";
import {styles} from '../StyleSheet.js';
import {GetCurrUser} from '../App.js'
import * as  ImagePicker  from 'react-native-image-picker';

import {UserContext} from '../UserContext'

export {ProfileScreen, EditScreen} 

var db = openDatabase({name:'users.db'});

class ProfileScreen extends Component{

    static contextType = UserContext;

    RetrievePosts(){
      var temp = [];
      db.transaction(function(tx)
      {

        tx.executeSql("SELECT * FROM post WHERE uid = ? ",[this.state.uid],
            (tx, results) => 
            {
              console.log("results.rows.item(i).caption");
              if(results.rows.length > 0)
              {
                for(let i = 0; i < results.rows.length;++i)
                {
                  temp.push({caption:results.rows.item(i).caption});
                  console.log(results.rows.item(i).caption + "\n");
                }
               
              }
              
              
               }
              );
      }
        );
      this.setState({
        posts:temp
      });
    }

    RetrieveFollow()
    {
      

      db.transaction(tx => {
        var temp1 = 0;
      var temp2 = 0;
        tx.executeSql(
          'SELECT * FROM followers F, users U WHERE U.user_id = F.uid AND U.user_id = ?',[this.state.uid],
          (tx,results) => {
            console.log("Followerlog = " + results.rows.length );
            this.setState({
            following:results.rows.length ,
            });
          }
          );

        tx.executeSql(
          'SELECT * FROM followers F, users U WHERE U.user_id = F.follower_id AND U.user_id = ?',[this.state.uid],
          (tx,results) => {
            this.setState({
            followers:results.rows.length ,
            });
          }
          );
        

      });

      
    }

    constructor(props, context) {
      super(props,context);
        this.state = {
        //get follow amount here
        currUser: GetCurrUser().uid,
        uid: (this.props.navigation.state.params.uid == -1 ? this.context.user.uid: this.props.navigation.state.params.uid),
        user_name : (this.props.navigation.state.params.uid == -1 ? this.context.user.user_name: this.props.navigation.state.params.user_name),
        pho_num : this.props.navigation.state.params.pho_num,
        posts:[],
        followers: 0,
        following: 0,   
    }
    
};   

    componentDidMount()
    {
      this.RetrievePosts();
      console.log("componentDidMount");
      this.RetrieveFollow();
    }
    render() {
      const{currUser} = this.state
      const {pho_num} = this.state
      const { navigate } = this.props.navigation
      const {user_name} = this.state
      const mail= this.props.navigation.state.params.mail
      const {posts} = this.state
      const {uid} = this.state
     const Follow = () =>
    {
      
      db.transaction(function(tx){
      tx.executeSql('INSERT INTO followers(uid, follower_id) VALUES(?,?)',[currUser,uid],
              (tx,results) => {
                if(results.rowsAffected > 0)
                {
                  console.log("Follow press by ? to ?", [currUser,uid]);
                }
                       
              }
              
    );
  
    });
      this.RetrieveFollow();
    }

      const handlePress = () => false
     // const {user_name} = this.state
      



    ProfileVariance = () =>
    {
      if(uid == currUser)
      {
        return(
          <View style={styles.wrapper}>
           
           <Button block style={styles.button} onPress={()=> navigate('Edit')} title ={ 'Edit Profile'}/>
           <Button block style={styles.button} onPress={()=> navigate('Create', {uid:currUser}) } title ={ 'Upload Post'}/>
            
        </View>
          );//
      }
      else
      {
        return(
          <View style={profileUI.wrapper}>
           
           <Button block style={styles.button} onPress={()=> Follow()} title ={ 'Follow'}/>
          </View>
          );//
      }
    }

    

    PostItem = (caption) => {

      /*
        <TouchableHighlight onPress={()=>PostNavigate(postID)}>
        <Image source = {src} style={{ width: 300, height: 300 }}/>
        </TouchableHighlight>
      */
      //
      src = './test.png';
      return(
        <View>
        <Text style={fontSize = 40}>{caption} </Text>
        
        </View>
        );//
    }



    PostNavigate = (postID) => {



      navigate(Post, {postID:postID});
    }

       return (
        <View style={profileUI.wrapper}>
          <Text style={profileUI.profileTitle}> {user_name}'s Profile </Text>
            
            <View style={profileUI.followStats} >

            <View >
            <Text style={profileUI.profiledetail}> {this.state.followers} </Text>
           <Text style={profileUI.profiledetail}> Followers </Text>
           </View>

           <View>
            <Text style={profileUI.profiledetail}> {this.state.following} </Text>
           <Text style={profileUI.profiledetail}> Following </Text>
           </View>

           </View>
          
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
      <View style={profileUI.wrapper}>
            <Text style={styles.register}>user name</Text>
            <TextInput style={styles.register} placeholder="Please enter your username" onChangeText={user_name => this.setState({ user_name })}/>
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
    wrapper: {
    flex: 1,
    backgroundColor: 'black',
  },

    followStats:{
      borderEndWidth:-10,
      justifyContent: 'center',
      alignContent:'flex-start',
      flexDirection:'row',
      color:'yellow',
    },
    profiledetail: {
    fontSize: 12,
    fontWeight: 'bold',
    overflow: 'hidden',
    color:'yellow',
    padding: 0,
    marginLeft: 20,

  },

    profileTitle: {
      color:'yellow',fontSize: 40,
    fontWeight: 'bold',

    }
});