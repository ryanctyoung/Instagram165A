/*Screen to register the user*/
import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert, Text } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
import {styles} from '../StyleSheet.js';
var db = openDatabase({ name: 'UserData.db' });

export default class RegisterUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      DOB: '',
      phone_num: '',
    };
  }

  register_user = () => {
    var that = this;
    const { user_name } = this.state;
    const { first_name } = this.state;
    const { last_name } = this.state;
    const { email } = this.state;
    const { password } = this.state;
    const { DOB } = this.state;
    const { phone_num } = this.state;
    alert(user_name, first_name, last_name, email, password, DOB, phone_num);
    if (user_name) {
      if (first_name) {
        if (last_name) { 
          if(email) {
            if( password ) {
              if (DOB) {
                if (phone_num) { 
          db.transaction(function(tx) {
            tx.executeSql(
              'INSERT INTO table_user (user_name, first_name, last_name, email, password, DOB, phone_num) VALUES (?,?,?,?,?,?,?)',
              [user_name, first_name, last_name, email, password, DOB, phone_num],
              (tx, results) => {
                console.log('Results', results.rowsAffected + user_name + first_name + last_name + email + password + DOB + phone_num); 
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'You are registered successfully',
                    [
                      {
                        text: 'Ok',
                        onPress: () =>
                          that.props.navigation.navigate('HomeScreen'),
                      },
                    ],
                    { cancelable: false }
                  );
                } else {
                  alert('Registration Failed');
                }
              }
            );
          });
        } else {
          alert('Please fill Phone Number');
        } 
      }else {
          alert('Please fill DOB');
        }
       } else {
          alert('Please fill password');
        }
      } else {
          alert('Please fill email');
        }
         }else {
          alert('Please fill Last Name');
        }
      } else {
        alert('Please fill First name');
      }
    } else {
      alert('Please fill User Name');
    }
  };

  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
      <Text style={styles.register}>User name</Text>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
            <Mytextinput
              placeholder="Enter User Name"
              onChangeText={user_name => this.setState({ user_name })}
            />
        <Text style={styles.register}>First Name</Text>
            <Mytextinput
              placeholder="Enter First Name"
              onChangeText={first_name => this.setState({ first_name })}
              maxLength={10}
              keyboardType="numeric"
            />
         <Text style={styles.register}>Last Name</Text>
            <Mytextinput
              placeholder="Enter Last Name"
              onChangeText={last_name => this.setState({ last_name })}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{ textAlignVertical: 'top' }}
            />
          <Text style={styles.register}>Date of Birth (MM/DD/YYYY)</Text>
          <Mytextinput
              placeholder="Enter Date of Birth (MM/DD/YYYY)"
              onChangeText={DOB => this.setState({ DOB })}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{ textAlignVertical: 'top' }}
            />
          <Text style={styles.register}>Phone Number</Text>
          <Mytextinput
              placeholder="Enter Phone Number"
              onChangeText={phone_num => this.setState({ phone_num })}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{ textAlignVertical: 'top' }}
            />
          <Text style={styles.register}>Email</Text>
          <Mytextinput
              placeholder="Enter Email"
              onChangeText={email => this.setState({ email })}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{ textAlignVertical: 'top' }}
            />
          <Text style={styles.register}>Password</Text>
          <Mytextinput
              placeholder="Enter Password"
              onChangeText={password => this.setState({ password })}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{ textAlignVertical: 'top' }}
            />
            <Mybutton
              title="Submit"
              customClick={this.register_user.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
