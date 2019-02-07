/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import GenerateForm from 'react-native-form-builder';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'users.db' });

class HomeScreen extends Component{
    render() {
      var uid;
      const {navigate} = this.props.navigation;
    const {user} = this.state;
    const handlePress = () => {

      db.transaction(function(tx) {
          
            tx.executeSql('CREATE TABLE IF NOT EXISTS App(uid INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20)) ');
            tx.executeSql('INSERT INTO App(name) VALUES("Amanda")');
            tx.executeSql('SELECT name FROM App a WHERE a.uid = ?', 
                  [0], (tx, results) => {
        
                  uid = results.row.item(0);
          
          });

        });

          this.setState((user) => {return {user:uid}; });



    };
    
    

    return (
      <View style={styles.container}>
       <Text style={styles.welcome}>Hello {this.state.user}</Text>
        <Button block style={styles.button} onPress={() => navigate('Register')} title="Register" />
        <Button block style={styles.button} onPress={() => navigate('Login')} title="Login" />
      </View>
    );
  }
}

class ProfileScreen extends Component{
    render() {
      const handlePress = () => false
      const name = this.props.navigation.state.params.name
      return (
        <View style={styles.wrapper}>
          <Text> Hello {name}</Text>
        </View>
      )
    }
}

class LoginScreen extends Component{
    constructor(props) {
      super(props);
      this.state = {
        user_name: '',
        password: '',
        user_found: false,
      };
    }

    render() {
    const handlePress = () => {
      const { user_name } = this.state;
      const { password } = this.state;
      const { navigate } = this.props.navigation;
      db.transaction(function(tx) {
          tx.executeSql(
            'SELECT user_id from users WHERE user_name = ? AND password = ?', [user_name, password],
            (tx, results) => {
              console.log('Results, ' + results);
              if (results.rows.length > 0){
                console.log("user found, "+user_name);
                navigate('Profile', { name: user_name });
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
      PhoNum: '',
      email: '',
      password: '',

    };
  }

  render() {
    const handlePress = () => {
      const { FirstName } = this.state;
      const { LastName } = this.state;
      const { DOB } = this.state;
      const { PhoNum } = this.state;
      const { email } = this.state;
      const { password } = this.state;
      db.transaction(function(tx) {
          tx.executeSql('DROP TABLE IF EXISTS users', []);
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, FirstName VARCHAR(20),LastName VARCHAR(20), DOB VARCHAR(20), PhoNum INTEGERS,  email VARCHAR(20), password VARCHAR(20)),',
            []
          );
          tx.executeSqandyl(
            'INSERT INTO users(FirstName, LastName, DOB, PhoNum, email, password) VALUES (?,?,?,?,?,?)',
            [FirstName, LastName, DOB, PhoNum, email,password],
            (tx, results) => {
              console.log('Results, ' + results.rowsAffected + FirstName + LastName + DOB + PhoNum + email + password);
            });
  })
};
    return (
        <View>
            <Text style={styles.register}>First Name</Text>
            <TextInput style={styles.register} placeholder="Please Enter Your First Name" onChangeText={FirstName => this.setState({ FirstName })} />
            <Text style={styles.register}>Last Name</Text>
            <TextInput placeholder="Please enter your Last Name" onChangeText={LastName => this.setState({ LastName})}/>
            <Text style={styles.register}>Date of Birth (MM/DD/YYYY)</Text>
            <TextInput placeholder="Please enter your date of birth" onChangeText={DOB => this.setState({ DOB})}/>
            <Text style={styles.register}>Phone Number</Text>
            <TextInput placeholder="Please enter your phone number" onChangeText={PhoNum => this.setState({ PhoNum})}/>
            <Text style={styles.register}>Email</Text>
            <TextInput placeholder="Please enter your email" onChangeText={email => this.setState({ email })}/>
            <Text style={styles.register}>Password</Text>
            <TextInput placeholder="Please enter your password" onChangeText={password => this.setState({ password })}/>

            <Button icon="md-checkmark" iconPlacement="right" onPress={handlePress} title="Register"/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
welcomewrap: {
  flex: 1,
  marginTop: 75
},

wrapper: {
    flex: 1,
    marginTop: 50,
  },
submitButton: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginBottom:  175,
  },
  register: {
    fontSize: 15,
    textAlign: 'left',
    margin: 1,
  },
  button: {
    
  }
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'red',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
  },
});
const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    Profile: ProfileScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);
type Props = {};
export default class App extends Component<Props> {
  render() {
    const handlePress = () => false
    return <AppContainer />;
  }
}