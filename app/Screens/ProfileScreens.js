import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, Image, FlatList, TouchableHighlight,ScrollView} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import {openDatabase} from 'react-native-sqlite-storage';
import {database} from "../App.js";
import {styles} from '../StyleSheet.js';
import {GetCurrUser} from '../App.js'
import * as  ImagePicker  from 'react-native-image-picker';
import { RkButton,RkText,RkCard,RkTheme, } from 'react-native-ui-kitten';
import { Avatar } from '../components/avatar';
import { UtilStyles } from '../style/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

//import {PostItem} from './PostScreen';

import {UserContext} from '../UserContext'

export {ProfileScreen, EditScreen} 

var db = openDatabase({name:'users.db'});

class ProfileScreen extends Component{
    static contextType = UserContext;
    RetrievePosts(){
      var temp = [];

      db.transaction(function(tx)
      {
        console.log("RetrievePosts");
        tx.executeSql("SELECT * FROM post ",[],
            (tx, results) => 
            {
              console.log("results.rows.item(i).caption");
              if(results.rows.length > 0)
              {
                for(let i = 0; i < results.rows.length;++i)
                {
                  temp.push({caption:results.rows.item(i).caption});
                  console.log(temp[i].caption + "\n");
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
          
           <View style={profileUI.followStats2} >
           
           <RkButton rkType='primary' style={UtilStyles.spaceBottom} onPress={()=> navigate('Edit')} > Edit Profile </RkButton>
           <RkButton rkType='primary' style={UtilStyles.spaceBottom} onPress={()=> navigate('Create', {uid:currUser}) } > Privacy </RkButton>
            
        </View>
          );//
      }
      else
      {
        return(
          
           <View style={profileUI.followStats2} >
           
           <Button block style={styles.button} onPress={()=> Follow()} title ={ 'Follow'}/>
          </View>
          ); //
      }
    }

    
    PostItem = (item) => {
      const likes = 0;
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

  );
    }

    /*PostItem = (item) => {
      const {caption} = item
      src = './test.png';
      return(
        <View>
        <Text style={{fontSize:40, color:'white'}}>{caption} </Text>
        
        </View>
        );//
    }*/



    PostNavigate = (postID) => {



      navigate(Post, {postID:postID});
    }

    const likeStyle = [styles.buttonIcon, { color: RkTheme.colors.accent }];
    const iconButton = [styles.buttonIcon, { color: RkTheme.current.colors.text.hint }];
       return (

        <ScrollView
      automaticallyAdjustContentInsets={true}
      style={UtilStyles.container}>
        <View style={profileUI.wrapper}>
          <Text style={profileUI.profileTitle}> {user_name}'s Profile </Text>
          <Image source={require('../img/Ava1.png')} style={styless.avatar} />  
          <Text style={profileUI.profileTitle}> {user_name} </Text>
            <View style={profileUI.followStats} >
            <View >
            <Text style={profileUI.profiledetail}> {this.state.followers} </Text>
           <Text style={profileUI.profiledetail}> Posts </Text>
           </View>

            <View >
            <Text style={profileUI.profiledetail}> {this.state.followers} </Text>
           <Text style={profileUI.profiledetail}> Followers </Text>
           </View>

           <View>
            <Text style={profileUI.profiledetail}> {this.state.following} </Text>
           <Text style={profileUI.profiledetail}> Following </Text>
  
            </View>    
       </View>
           <View style={profileUI.wrapper}>
              <ProfileVariance />          
            </View>
           <View style={profileUI.wrapper}>
           <Text style={profileUI.bio}>
             Bio 
           </Text>
           <Text style={profileUI.bio}>
             I love to eat grass and drink water! 
           </Text>
           </View>

           <FlatList
            data={posts}
            renderItem={({item}) => PostItem(item)}
              />
          
           
        </View>

        </ScrollView>
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

RkTheme.setType('RkCard', 'story', {
  img: {
    height: 100,
    opacity: 0.7
  },
  header: {
    alignSelf: 'auto'
  },
  content:{
    alignSelf:'auto'
  }
});

RkTheme.setType('RkText','hero',{
  fontSize: 15,
  color:'darkgreen'
 });

let styless = StyleSheet.create({
  screen: {
    backgroundColor: '#f0f1f5',
    padding: 12,
  },
  buttonIcon: {
    marginRight: 7,
    fontSize: 19.7,
  },
  footer: {
    marginHorizontal: 16,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 17,
  },
  dot: {
    fontSize: 6.5,
    color: '#0000008e',
    marginLeft: 2.5,
    marginVertical: 10,
  },
  floating: {
    width: 56,
    height: 56,
    position: 'absolute',
    zIndex: 200,
    right: 16,
    top: 173,
  },
  footerButtons: {
    flexDirection: 'row',
  },
  overlay: {
    justifyContent: 'flex-end',
    paddingVertical: 23,
    paddingHorizontal: 16,
  },
});

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
      right:-50,
      bottom:80,
      color:'blue',
    },
    followStats2:{
      justifyContent: 'center',
      alignContent:'center',
      flexDirection:'row',
      right:-50,
      bottom:70,
      color:'blue',
    },
    profiledetail: {
    fontSize: 12,
    fontWeight: 'bold',
    overflow: 'hidden',
    color:'blue',
    padding: 0,
    marginLeft: 20,
  },
    bio: {
    fontSize: 12,
    fontWeight: 'bold',
    overflow: 'hidden',
    color:'blue',
    padding: 0,
    marginLeft: 20,
    bottom:45
  },

    profileTitle: {
      color:'darkgreen',fontSize: 15,
    fontWeight: 'bold',

    }
});