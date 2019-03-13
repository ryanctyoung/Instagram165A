import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import {openDatabase} from 'react-native-sqlite-storage';
import {database} from "../App.js";
import {styles} from '../StyleSheet.js';
import {UserContext} from '../UserContext'
import {RkButton,RkText,RkTheme,RkTextInput} from 'react-native-ui-kitten';
import { UtilStyles } from '../style/styles';
;

export {HomeScreen, RegisterScreen} 


var db = openDatabase({name:'users.db'});


class HomeScreen extends Component{
    static contextType = UserContext;
    constructor(props, context)
    {
      super(props,context); 
      this.state = {uid:this.props.navigation.state.params.uid, 
                    user_name:'',
                    password:''};

    }    
    
    componentDidMount()
    {
      db.transaction(function(tx) 
    {
      console.log("Post Table Instantiation\n");
      //Post
      //tx.executeSql("DROP TABLE IF EXISTS post", []);
      tx.executeSql(
            'CREATE TABLE IF NOT EXISTS post( post_id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER, caption TEXT, UNIQUE (user_id, post_id))',
            []
          );
      tx.executeSql(
            'CREATE TABLE IF NOT EXISTS comments( comment_id INTEGER PRIMARY KEY AUTOINCREMENT, post_id INTEGER, user_id INTEGER, text TEXT, UNIQUE (user_id, post_id))',
            []
          );
      tx.executeSql(
            'CREATE TABLE IF NOT EXISTS likes( post_id INTEGER, user_id INTEGER, UNIQUE(user_id, post_id))',
            []
          );

    }

      );
    }
    render() {
      const { navigate } = this.props.navigation;
    const loginPress = (fun) => {

      console.log("loginPress")
      const { user_name } = this.state;
      const { password } = this.state;
      const { navigate } = this.props.navigation;
      const { reset } = this.props.navigation;

      db.transaction(function(tx) {
          tx.executeSql(
            'SELECT * from users WHERE user_name = ? AND password = ?', [user_name, password],
            (tx, results) => {
              console.log('Results, ' + results.rows.item(0).email);
              if (results.rows.length > 0){
                currUser = results.rows.item(0).user_id;
                userName = results.rows.item(0).user_name;
                phoNum = results.rows.item(0).phoneNum;
                fun({uid:currUser,user_name:userName,followers:0});
                navigate('App', {uid: currUser, user_name: userName, pho_num:phoNum});
                
              }
            });
  })
    };
    const autoLogin = (x) => {
          var userName = '';
          var phoNum = 0;
        db.transaction(function(tx)
          {
            //console.log("HOMESCREENECHEK");
            tx.executeSql('SELECT user_name, phoneNum FROM users WHERE user_id = ? ',[x],
              (tx,results) => {
                if(results.rows.length > 0)
                {
                  console.log("AutoLogin attempt");
                  userName = results.rows.item(0).user_name;
                  phoNum = results.rows.item(0).phoneNum;
                  this.context.LoginUser({uid:currUser,user_name:userName,followers:0});

                  navigate('App', {uid: x, user_name: userName, pho_num:phoNum});
                }
                else
                {
                  userName = 'Error'; 
                }         
              }
              ); 
    },)
      }

    function HomeOptions(props)
    {
      
      return(
          <View>
            <UserContext.Consumer>
                {({LoginUser}) => (<Button icon="md-checkmark" iconPlacement="right" onPress={() => loginPress(LoginUser)} title="Login"/>)}
                </UserContext.Consumer>
            
            <View styles = {styles.bottomTest}>
              <Button styles = {styles.bottomTest} onPress={() => navigate('Forget Password')} title="Forget Password?" />
            </View>
        
            <Text style={styles.dontHave}>OR</Text>
            <Text style={styles.dontHave}>Dont have an account? </Text>
         
          <Button onPress={() => navigate('Register')} title= "Register" /> 
          <Button block style={{}} onPress={() => navigate('Feed')} title="Feed" />
          </View>
          );

    }
    

    if(this.state.uid >= 0)
    {
     autoLogin(this.state.uid)
    }

    return (
      <View style={styles.containerHome}>
       <Text style={styles.welcome}>AggieGram V 0. 0. 1</Text>
       <Text style={styles.HomeLogin}>Username</Text>
       <TextInput style={styles.HomeText} placeholder="Please Enter Your Username" onChangeText={user_name=> this.setState({ user_name })} />
       <Text style={styles.HomeLogin}>Password</Text>
       <TextInput style={styles.HomeText} placeholder="Please Enter Your Password" onChangeText={password=> this.setState({ password })} />
       
       
       <HomeOptions/>


      </View>
    );
  }
}
HomeScreen.contextType = UserContext;




class RegisterScreen extends Component{
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      FirstName: '',
      LastName: '',
      DOB: '',
      phoneNum: '',
      email: '',
      password: '',

    };
  }

  render() {
    const handlePress = () => {
      const { navigate } = this.props.navigation;
      const { FirstName } = this.state;
      const { LastName } = this.state;
      const { user_name } = this.state;
      const { email } = this.state;
      const { password } = this.state;
      const { DOB } = this.state;
      const { phoneNum } = this.state;
      db.transaction(function(tx) {
          tx.executeSql('DROP TABLE IF EXISTS followers', []);

          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name TEXT UNIQUE, FirstName TEXT, LastName TEXT, email TEXT, password TEXT, DOB INTEGER DEFAULT 0, phoneNum INTEGER DEFAULT 0)',
            []
          );
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS followers(uid INTEGER, follower_id INTEGER, UNIQUE (uid, follower_id))',
            []
          );

          tx.executeSql(
            'INSERT INTO users(user_name, FirstName, LastName, email, password, DOB, phoneNum) VALUES (?,?,?,?,?,?,?)',
            [user_name, FirstName, LastName, email,password, DOB, phoneNum],
            (tx, results) => {
              if(results.rowsAffected > 0)
              {
                tx.executeSql(
              'SELECT * FROM users WHERE user_name = ?',[user_name],(tx,results) => {
                if(results.rows.length > 0)
                {
                  
                  navigate('Home', {uid:-1}); 
                }
               
              }
              );
              }
              
            }); 
  })
};
    return (
      <ScrollView
        style={UtilStyles.container}
        automaticallyAdjustContentInsets={true}>
        
        <View style={styles.container}>
        <Text style={styles.register}>User Name</Text>
        <RkTextInput rkType='success' placeholder="Please Enter Your user name" onChangeText={user_name=> this.setState({ user_name })} />
        
        <Text style={styles.register}>First Name</Text>
        <RkTextInput rkType='success' placeholder="Please Enter Your First Name" onChangeText={FirstName => this.setState({ FirstName })} />
        
        <Text style={styles.register}>Last Name</Text>
        <RkTextInput rkType='success' placeholder="Please enter your Last Name" onChangeText={LastName => this.setState({ LastName})}/>
            
        <Text style={styles.register}>Date Of Birth</Text>
        <RkTextInput rkType='success' placeholder="Please enter your date of birth" onChangeText={DOB => this.setState({ DOB})}/>
            
        <Text style={styles.register}>Phone Number</Text>
        <RkTextInput rkType='success'  placeholder="Please enter your phone number" onChangeText={phoneNum => this.setState({ phoneNum})}/>
            
        <Text style={styles.register}>Email</Text>
        <RkTextInput rkType='success' placeholder="Please enter your email" onChangeText={email => this.setState({ email })}/>
        
        <Text style={styles.register}>Password</Text>
        <RkTextInput rkType='success'placeholder="Please enter your password" onChangeText={password => this.setState({ password })}/>
            
        <RkButton rkType= 'rounded' style={styles.rkButtonHome}
            contentStyle={{color: 'red'}} buttonStyle={{ width: 50 }} onPress={() => handlePress()}>Register</RkButton>

        <RkButton rkType= 'rounded' style={styles.rkButtonHome}
            contentStyle={{color: 'red'}} buttonStyle={{ width: 50 }} onPress={() => navigate('Home', {uid:-1})}>Back</RkButton>
            <Button icon="md-checkmark" iconPlacement="right" onPress={handlePress} title="Register"/>
        </View>
        </ScrollView>
    );
  }
}


RkTheme.setType('RkTextInput','success',{
  labelColor:'blue',
  underlineColor:'darkgreen',
  placeholderTextColor: 'green',
  labelFontSize:15,
  underlineWidth:1,
 
  bottom: 70,
  input:{backgroundColor: 'black',color: 'red'}
});

//...

RkTheme.setType('RkTextInput', 'Register', {
  backgroundColor: 'white',
  underlineColor:'darkgreen',
  underlineWidth:1,
  input: {
    
    marginLeft: 1,
    marginHorizontal: 0,
  },
  labelStyle: {
    color:'blue',
  }
});

RkTheme.setType('RkButton', 'dark', {
  container: {
     backgroundColor: 'gray',
     borderRadius: 10,
  }
});

RkTheme.setType('RkButton', 'white', {
  container: {
     backgroundColor: 'white',
     borderRadius: 15,
  }
});

// The same because 'container' is default component:
RkTheme.setType('RkButton', 'dark', {
  backgroundColor: 'gray',
  borderRadius: 10,
});

RkTheme.setType('RkButton', 'icon', {
  fontSize: 24,
  width: 46,
  borderRadius: 25,
  hitSlop: {top: 5, left: 5, bottom: 5, right: 5}
});
