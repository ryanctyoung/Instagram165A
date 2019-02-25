/*Screen to update the user*/
import React from 'react';
import { View, YellowBox, ScrollView, KeyboardAvoidingView, Alert, } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserData.db' });

export default class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_user_id: '',
      user_name: '',
      email: '',
      phone_num: '',
    };
  }
  searchUser = () => {
    const {input_user_id} =this.state;
    console.log(this.state.input_user_id);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_user where user_id = ?',
        [input_user_id],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len',len);
          if (len > 0) {
            console.log(results.rows.item(0).email);
            this.setState({
             user_name:results.rows.item(0).user_name,
            });
            this.setState({
             email:results.rows.item(0).email,
            });
            this.setState({
             phone_num:results.rows.item(0).phone_num,
            });
          }else{
            alert('No user found');
            this.setState({
              user_name:'',
              email:'',
              phone_num:'',
            });
          }
        }
      );
    });
  };
  updateUser = () => {
    var that=this;
    const { input_user_id } = this.state;
    const { user_name } = this.state;
    const { email } = this.state;
    const { phone_num } = this.state;
    if (user_name){
      if (email){
        if (phone_num){
          db.transaction((tx)=> {
            tx.executeSql(
              'UPDATE table_user set user_name=?, email=? , phone_num=? where user_id=?',
              [user_name, email, phone_num, input_user_id],
              (tx, results) => {
                console.log('Results',results.rowsAffected);
                if(results.rowsAffected>0){
                  Alert.alert( 'Success', 'User updated successfully',
                    [
                      {text: 'Ok', onPress: () => that.props.navigation.navigate('HomeScreen')},
                    ],
                    { cancelable: false }
                  );
                }else{
                  alert('Updation Failed');
                }
              }
            );
          });
        }else{
          alert('Please fill Phone Number');
        }
      }else{
        alert('Please fill email');
      }
    }else{
      alert('Please fill User Name');
    }
  };

  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
            <Mytextinput
              placeholder="Enter User Id"
              onChangeText={input_user_id => this.setState({ input_user_id })}
            />
            <Mybutton
              title="Search User"
              customClick={this.searchUser.bind(this)}
            />
            <Mytextinput
              placeholder="Enter Name"
              value={this.state.user_name}
              onChangeText={user_name => this.setState({ user_name })}
            />
            <Mytextinput
              placeholder="Enter email"
              value={''+ this.state.email}
              onChangeText={email => this.setState({ email })}
              maxLength={20}
              numberOfLines={5}
              multiline={true}
              style={{textAlignVertical : 'top'}}
            />
            <Mytextinput
              value={this.state.phone_num}
              placeholder="Enter Phone Number"
              onChangeText={phone_num => this.setState({ phone_num })}
              keyboardType="numeric"
              maxLength={10}
            />
            <Mybutton
              title="Update User"
              customClick={this.updateUser.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
