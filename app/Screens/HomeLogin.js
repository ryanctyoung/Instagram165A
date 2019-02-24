import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, } from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import {openDatabase} from 'react-native-sqlite-storage';
import {database} from "../App.js";
import {styles} from '../StyleSheet.js';

export {HomeScreen, LoginScreen, RegisterScreen} 

var db = openDatabase(database);

class HomeScreen extends Component{
    constructor(props)
    {
      super(props); 
      this.state = {uid:this.props.navigation.state.params.uid};
      currUser = this.state.uid;

    }    
    
    render() {
    const {uid} = this.state;
    const {navigate} = this.props.navigation;
    const { reset } = this.props.navigation;

    const profilePress = (x) => {
          var userName = x;
          var phoNum = 0;
        db.transaction(function(tx)
          {
            tx.executeSql('SELECT user_name, phoneNum FROM users WHERE user_id = ? ',[x],
              (tx,results) => {
                if(results.rows.length > 0)
                {
                  userName = results.rows.item(0).user_name;
                  phoNum = results.rows.item(0).phoneNum;
                  reset([NavigationActions.navigate({routeName : 'Feed'})] , 0 );
                }
                else
                {
                  userName = 'Error'; 
                }         
              }
              );      
          });
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
    

    if(currUser >= 0) profilePress(currUser)

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
                //navigate('Feed');
                reset([NavigationActions.navigate({routeName : 'Feed'})] , 0 );
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
          tx.executeSql('DROP TABLE IF EXISTS users', []);

          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), FirstName VARCHAR(20), LastName VARCHAR(20), email VARCHAR(20), password VARCHAR(20), DOB INTEGER DEFAULT 0, phoneNum INTEGER DEFAULT 0)',
            []
          );
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS followers(followedID INTEGER, followerID INTEGER, date INTEGER default 0, UNIQUE (followedID, followerID, date))',
            []
          );

          tx.executeSql(
            'INSERT INTO users(user_name, FirstName, LastName, email, password, DOB, phoneNum) VALUES (?,?,?,?,?,?,?)',
            [user_name, FirstName, LastName, email,password, DOB, phoneNum],
            (tx, results) => {
              console.log('Results, ' + results.rowsAffected + user_name + FirstName + LastName + email + password + DOB + phoneNum);
              userTuple.user_name = user_name;
              userTuple.uid = results.insertID;
              navigate('Home');
            }); 
  })
};
    return (
        <View>
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