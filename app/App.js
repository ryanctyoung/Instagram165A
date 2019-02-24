import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, } from 'react-native';
import{SearchBar,} from 'react-native-elements';
import {createStackNavigator, createBottomTabNavigator, createAppContainer,NavigationActions, StackActions} from 'react-navigation';
/*import GenerateForm from 'react-native-form-builder';*/
import {HomeScreen, LoginScreen, RegisterScreen} from './Screens/HomeLogin.js'
import {ProfileScreen, EditScreen} from './Screens/ProfileScreens.js';
import {openDatabase} from 'react-native-sqlite-storage';
import {styles} from './StyleSheet.js';

//export {Database, currUser, userTuple};
//var db = openDatabase({ name: 'users.db' });

var database = {name:'users.db'};
var db = openDatabase(database);
var userTuple = {uid: -1,  user_name:'AGGIE', bio:'', followers: 0};
var currUser = -1;

/*class Database
{
  GetConnection()
  {
    return openDatabase({ name: 'users.db' });
  }
}*/
export{database};



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