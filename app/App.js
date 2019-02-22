import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
/*import GenerateForm from 'react-native-form-builder';*/
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'users.db' });

var userTuple = {uid: 0,  user_name:'AGGIE', bio:'', followers: 0};
var currUser = userTuple.uid;


class HomeScreen extends Component{
    constructor(props)
    {
      super(props);     
    }    
    
    render() {
      var uid;
      const {navigate} = this.props.navigation;
    this.state = {
        user: '',
      };
    const handlePress = () => {
        const {user} = this.state;
        this.setState((user) => {return {user:uid}; });

    };

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
                  navigate('Profile', { uid: currUser, user_name: userName, pho_num: phoNum});
                }
                else
                {
                  userName = 'Error'; 
                }         
              }
              );      
          });
    }
    
    return (
      <View style={styles.container}>
       <Text style={styles.welcome}>aggiegram</Text>
        <Button block style={styles.button} onPress={() => navigate('Register')} title="Register" />
        <Button block style={styles.button} onPress={() => navigate('Login')} title="Login" />
        <Button block style={styles.button} onPress={() => profilePress(userTuple.uid)} title="Profile" />
        <Button block style={styles.button} onPress={() => navigate('Profile', { uid: 10 , user_name: "COW", pho_num: 7})} title="Other Profile" />
      </View>
    );
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
      const name = this.props.navigation.state.params.name
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
    const { uid } = userTuple.uid;
       
        db.transaction(function(tx) {
          tx.executeSql(
            'UPDATE users SET user_name = ?, email = ?, phoneNum = ? WHERE user_id = ?', [user_name, email, phoneNum,uid],
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

      db.transaction(function(tx) {
          tx.executeSql(
            'SELECT * from users WHERE user_name = ? AND password = ?', [user_name, password],
            (tx, results) => {
              console.log('Results, ' + results.rows.item(0).email);
              if (results.rows.length > 0){
                console.log("user found, "+user_name + email + phoneNum);
                currUser = results.rows.item(0).user_id;
                navigate('Profile', {uid:currUser, name: user_name, mail: results.rows.item(0).email, phone:results.rows.item(0).phoneNum });
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
const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    Profile: ProfileScreen,
    Edit: EditScreen,
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