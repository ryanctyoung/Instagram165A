import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, } from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import {openDatabase} from 'react-native-sqlite-storage';
import {database, Login} from "../App.js";
import {styles} from '../StyleSheet.js';

export {HomeScreen, LoginScreen, RegisterScreen} 

var db = openDatabase({name:'users.db'});

class HomeScreen extends Component{
    constructor(props)
    {
      super(props); 
      this.state = {uid:this.props.navigation.state.params.uid, };

    }    
    
    render() {
    const {uid} = this.state;
    const {navigate} = this.props.navigation;
    const { reset } = this.props.navigation;

    const profilePress = (x) => {
          var userName = '';
          var phoNum = 0;
        db.transaction(function(tx)
          {
            console.log("HOMESCREENECHEK");
            tx.executeSql('SELECT user_name, phoneNum FROM users WHERE user_id = ? ',[x],
              (tx,results) => {
                if(results.rows.length > 0)
                {
                  
                  userName = results.rows.item(0).user_name;
                  phoNum = results.rows.item(0).phoneNum;
                  Login({uid:x,user_name:userName, followers: 0});
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
          <Button block style={styles.button} onPress={() => navigate('Register')} title= "Register" />
        <Button block style={styles.button} onPress={() => navigate('Login')} title="Login" />
          </View>
          );

    }
    

    if(this.state.uid >= 0) profilePress(this.state.uid)

    return (
      <View style={styles.container}>
       <Text style={styles.welcome}>aggiegram</Text>
       <HomeOptions/>
      </View>
    );
  }
}


class LoginScreen extends Component{
    constructor(props) {
      super(props);
      this.state = {
        user_name: '',
        password: '',
        email: '',
        phoneNum: '',
        user_found: false,
      };
    }

    render() {
    const handlePress = () => {
      const { user_name } = this.state;
      const { password } = this.state;
      const { email } = this.state;
      const { phoneNum } = this.state;
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
                Login({uid:currUser,user_name:userName, followers: 0});
                navigate('App', {uid: currUser, user_name: userName, pho_num:phoNum});
                //reset([NavigationActions.navigate({routeName : 'App'})] , 0 );
              }
            });
  })
}; 
    return (
      <View style={styles.wrapper}>

        <Text style={styles.register}>Email</Text>
        <TextInput style={styles.register}placeholder="Please Enter your username" onChangeText={user_name => this.setState({ user_name })}/>
        <TextInput placeholder="Please Enter a password" onChangeText={password => this.setState({ password })}/>
        <Button icon="md-checkmark" iconPlacement="right" onPress={handlePress} title="Login"/>
      </View>
    );
  }
}

class RegisterScreen extends Component{
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
            'CREATE TABLE IF NOT EXISTS users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20) UNIQUE, FirstName VARCHAR(20), LastName VARCHAR(20), email VARCHAR(20), password VARCHAR(20), DOB INTEGER DEFAULT 0, phoneNum INTEGER DEFAULT 0)',
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
                  Login({uid:results.rows.item(0).user_id,user_name:user_name, followers: 0});
                  navigate('Home'); 
                }
               
              }
              );
              }
              
            }); 
  })
};
    return (
        <View style={styles.container}>
          <Text style={styles.register}>User name</Text>
            <TextInput style={styles.register} placeholder="Please Enter Your user name" onChangeText={user_name=> this.setState({ user_name })} />
            <Text style={styles.register}>First Name</Text>
            <TextInput style={styles.register} placeholder="Please Enter Your First Name" onChangeText={FirstName => this.setState({ FirstName })} />
            <Text style={styles.register}>Last Name</Text>
            <TextInput placeholder="Please enter your Last Name" onChangeText={LastName => this.setState({ LastName})}/>
            <Text style={styles.register}>Date of Birth (MM/DD/YYYY)</Text>
            <TextInput placeholder="Please enter your date of birth" onChangeText={DOB => this.setState({ DOB})}/>
            <Text style={styles.register}>Phone Number</Text>
            <TextInput placeholder="Please enter your phone number" onChangeText={phoneNum => this.setState({ phoneNum})}/>
            <Text style={styles.register}>Email</Text>
            <TextInput placeholder="Please enter your email" onChangeText={email => this.setState({ email })}/>
            <Text style={styles.register}>Password</Text>
            <TextInput placeholder="Please enter your password" onChangeText={password => this.setState({ password })}/>

            <Button icon="md-checkmark" iconPlacement="right" onPress={handlePress} title="Register"/>
        </View>
    );
  }
}