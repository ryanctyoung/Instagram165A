import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, } from 'react-native';
import{SearchBar,} from 'react-native-elements';
import {createStackNavigator, createBottomTabNavigator, createAppContainer,NavigationActions, StackActions} from 'react-navigation';
/*import GenerateForm from 'react-native-form-builder';*/
import {HomeScreen, LoginScreen, RegisterScreen} from './Screens/HomeLogin.js'
import {openDatabase} from 'react-native-sqlite-storage';
import {styles} from './StyleSheet.js';

//export {Database, currUser, userTuple};
//var db = openDatabase({ name: 'users.db' });

var db = openDatabase({ name: 'users.db' });
var userTuple = {uid: -1,  user_name:'AGGIE', bio:'', followers: 0};
var currUser = -1;

class Database
{
  GetConnection()
  {
    return db;
  }
}
export{Database};



class FeedScreen extends Component{

  constructor(props)
  {
    super(props);
    this.state = {search: '',}
  }

  updateSearch = search => {
    this.setState({ search });
  };

  render()
  {
    const { search } = this.state;

    return (
    <View style = {styles.wrapper}> 
    <Text style={styles.register}>Feed</Text>

    <SearchBar
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={search}
      />


    </View>);
  }
}

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
      const name = this.props.navigation.state.params.user_name
      const phone = this.props.navigation.state.params.phone
      const mail= this.props.navigation.state.params.mail
      
      const {uid} = this.state
/*
    TODO:
    profile pic
    Bio: display and edit
    Follow backend query and insert
    feed
*/
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
          <Text> {name}'s Profile </Text>
            <Text style={styles.profiledetail}> {this.state.followers} </Text>
           <Text style={styles.profiledetail}> Followers </Text>
           
           <Button block style={styles.button} onPress={navigatePress} title ={ uid == currUser ? 'Edit Profile' : 'Follow'}/>
            <Text style = {styles.bio}> {pho_num} </Text>
   
          <Text> Hello {name}!!! </Text>
          <Text> my email is {mail} </Text>     
           <Text> my phone number is {phone}</Text>   
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






/*
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
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    marginBottom:  175,
  },
  register: {
    fontSize: 15,
    textAlign: 'left',
    margin: 1,
  },

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

    
  profiledetail: {
    fontSize: 12,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 0,
    marginLeft: 140,
  },


  bio: {
    fontSize: 30,
    textAlign: 'left',
    marginTop: 30,
  },

});

*/
const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    Profile: ProfileScreen,
    Edit: EditScreen,
    Feed: FeedScreen,
  },
  {
    initialRouteName: 'Home',
    initialRouteParams: {uid: -1},
  }
);



const AppContainer = createAppContainer(RootStack);
//const TabContainer = createAppContainer(TabNavigator);
type Props = {};
export default class App extends Component<Props> {
  render() {
    const handlePress = () => false
    return <AppContainer />;
  }
}