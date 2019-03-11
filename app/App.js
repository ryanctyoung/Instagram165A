import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, } from 'react-native';
import{SearchBar,} from 'react-native-elements';
import {createDrawerNavigator, createStackNavigator, createSwitchNavigator, createBottomTabNavigator, createAppContainer,NavigationActions, StackActions} from 'react-navigation';
/*import GenerateForm from 'react-native-form-builder';*/

import {openDatabase} from 'react-native-sqlite-storage';
import {styles} from './StyleSheet.js';
//import HomeScreen from './pages/HomeScreen';

import {HomeScreen, RegisterScreen} from './Screens/HomeLogin.js'
import {ProfileScreen, EditScreen} from './Screens/ProfileScreens.js';
import FeedScreen from './Screens/FeedScreen';
import {PostScreen,CreatePost} from './Screens/PostScreen';
import SearchWindow from './Screens/SearchWindow';

import {UserContext} from './UserContext';
//export {Database, currUser, userTuple};
//var db = openDatabase({ name: 'users.db' });

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
export{db as database, GetCurrUser, Login};

 function GetCurrUser()
{
  
  return userTuple;
}

const Login = (loggedUser) =>
{
  userTuple = loggedUser;
}


const PostStack = createStackNavigator(
{ 
  Create:CreatePost,
    Post: PostScreen,
    
},
{
  //initialRouteName :"Post",
  //initialRouteParams:{postID:this.props.navigation.params.postID},
}
  );



const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
    Edit: EditScreen,
    PostStack: PostStack,

  },
  {
    
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
    PostStack: PostStack,
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
    Search: SearchStack,
    Post: CreatePost,
    Profile: {screen: ProfileStack, 
      navigationOptions: () => ({
      tabBarOnPress:({navigation, defaultHandler}) => {
        
        navigation.setParams({uid:userTuple.uid, user_name:userTuple.user_name, pho_num:0});
        navigation.navigate('Profile', {uid:-1, user_name:userTuple.uid, pho_num:0});
        
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
  
  constructor(props, context)
  {
    super(props,context);
    this.state = {
      user: userTuple,
      LoginUser: (u) => {
        const temp = u
        console.log("LOGINUSER" + " " + temp.uid);
        this.setState(state => ({user:temp}))
        userTuple = u;

      },
    };
  }

  render() {
    userTuple = this.context.user;
    const handlePress = () => false
    return(
      <UserContext.Provider value = {this.state}>
      <AppContainer />
      </UserContext.Provider>
      ); 
  }
}
App.contextType = UserContext;