import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, } from 'react-native';
import{SearchBar,} from 'react-native-elements';
import {createDrawerNavigator, createStackNavigator, createSwitchNavigator, createBottomTabNavigator, createAppContainer,NavigationActions, StackActions} from 'react-navigation';
/*import GenerateForm from 'react-native-form-builder';*/

import {openDatabase} from 'react-native-sqlite-storage';
import {styles} from './StyleSheet.js';


import {HomeScreen, LoginScreen, RegisterScreen} from './Screens/HomeLogin.js'
import {ProfileScreen, EditScreen} from './Screens/ProfileScreens.js';
import FeedScreen from './Screens/FeedScreen';
import PostScreen from './Screens/PostScreen';
import SearchWindow from './Screens/SearchWindow';

//export {Database, currUser, userTuple};
//var db = openDatabase({ name: 'users.db' });
;
var database = {name:'users.db'};
var db = openDatabase({name:'users.db'});
var userTuple = {uid: 1,  user_name:'AGGIE', followers: 0}

/*class Database
{
  GetConnection()
  {
    return openDatabase({ name: 'users.db' });
  }
}*/
export{db as database, Follow, GetCurrUser, Login};

const GetCurrUser = () =>
{
  
  return userTuple;
}

const Login = (loggedUser) =>
{
  userTuple = loggedUser;
}
const Follow = (followid) =>
{
  db.transaction(function(tx)
  {
    tx.executeSql('INSERT IF NOT EXISTS INTO follow (uid, follower_uid) VALUES (?, ?)', [currUser,followid], 
      (tx,results) => 
      {

      }
      )
  }
    );
  
}



const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
    Edit: EditScreen,
    Post: PostScreen,

  },

    {
    initialRouteName: 'Profile',
  }
);




const SearchStack = createStackNavigator(
  {
    Search: SearchWindow,
    Profile: ProfileStack,

  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
  );

const FeedStack = createStackNavigator(
  {
    Feed: FeedScreen,
    Profile: ProfileStack,
    Post: {screen:ProfileStack, },
    Search: SearchStack,
  },
  {
    initialRouteName: 'Feed',
    mode: 'modal',
  }
);


const TabNavigator = createBottomTabNavigator(
  {
    Feed:FeedStack,
    Profile: {screen: ProfileStack, 
      navigationOptions: () => ({
      tabBarOnPress:({navigation, defaultHandler}) => {
        navigation.setParams({uid:userTuple.uid, user_name:userTuple.user_name, pho_num:0});
        navigation.navigate('Profile', {uid:userTuple.uid, user_name:userTuple.user_name, pho_num:0});
        
      },

      })
    },
    //Settings: SettingStack,

    

  },
  {
    initialRouteName: 'Feed',
  }
    );


const EntryStack = createSwitchNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    App: TabNavigator,
  },
  {
    initialRouteName: 'Home',
    initialRouteParams: {uid: userTuple.uid},
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