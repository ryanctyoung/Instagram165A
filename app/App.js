import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, } from 'react-native';
import{SearchBar,} from 'react-native-elements';
import {createStackNavigator, createSwitchNavigator, createBottomTabNavigator, createAppContainer,NavigationActions, StackActions} from 'react-navigation';
/*import GenerateForm from 'react-native-form-builder';*/
import {HomeScreen, LoginScreen, RegisterScreen} from './Screens/HomeLogin.js'
import {ProfileScreen, EditScreen} from './Screens/ProfileScreens.js';
import {openDatabase} from 'react-native-sqlite-storage';
import {styles} from './StyleSheet.js';

//export {Database, currUser, userTuple};
//var db = openDatabase({ name: 'users.db' });

var database = {name:'users.db'};
var db = openDatabase({name:'users.db'});
var userTuple = {uid: -1,  user_name:'AGGIE', bio:'', followers: 0};
var currUser = -1;

/*class Database
{
  GetConnection()
  {
    return openDatabase({ name: 'users.db' });
  }
}*/
export{db as database};



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
    <View style = {feedUI.wrapper}> 
    <Text style={feedUI.label}>Feed</Text>

    <SearchBar
        placeholder="User Search"
        onChangeText={this.updateSearch}
        value={search}
      />

    </View>);
  }
}

const feedUI = StyleSheet.create(
  {
    wrapper : {
      flex: 1,
      backgroundColor: 'lightblue',
    },

    label:{
      fontSize: 50,
    color: 'yellow',
    textAlign: 'left',
    margin: 10,
    fontWeight: 'bold',
    }
  }
);



const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
    Edit: EditScreen,


  },

    {
    initialRouteName: 'Profile',
    initialRouteParams: {uid: 1},
  }
);

const FeedStack = createStackNavigator(
  {
    Feed: FeedScreen,
    Profile: ProfileStack,
    //photo stack
  }
);


const TabNavigator = createBottomTabNavigator(
  {
    Feed:FeedStack,
    Profile: ProfileStack,
    //Settings: SettingStack,

    

  },
  {
    initialRouteName: 'Feed',
  }

)


const EntryStack = createSwitchNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    App: TabNavigator,
  },
  {
    initialRouteName: 'Home',
    initialRouteParams: {uid: -1},
  }
);



const AppContainer = createAppContainer(EntryStack);
type Props = {};
export default class App extends Component<Props> {
  render() {
    const handlePress = () => false
    return <AppContainer />;
  }
}