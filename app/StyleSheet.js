import {Platform, StyleSheet, Text, View, Button, TextInput, } from 'react-native';
export {styles};
const styles = StyleSheet.create({
welcomewrap: {
  flex: 1,
  marginTop: 75
},

buttonContainer: {
  position: 'absolute',
  bottom:70,
  left: 244,
  fontSize: 5
},

wrapper: {
    flex: 1,
    marginTop: 50,
    backgroundColor: 'darkgray',
  },
submitButton: {
    paddingHorizontal: 10,
    color: 'yellow',
    paddingTop: 20,
  },
  containerHome: {
    flex: 1,
    justifyContent: 'center',
    color: 'yellow',
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 75,
    color: 'yellow',
    backgroundColor: 'black'
  },
  welcome: {
    fontSize: 25,
    color: 'purple',
    textAlign: 'center',
    margin: 5,
    fontWeight: 'bold',
    marginBottom:  30,
    bottom: 60
  },
  register: {
    fontSize: 15,
    color: 'grey',
    textAlign: 'left',
    bottom:25
  },

  HomeLogin: {
    fontSize: 20,
    color: 'grey',
    textAlign: 'left',
    margin: 1,
    bottom: 70
  },
  HomeText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'left',
    margin: 1,
    bottom: 70
  },

  instructions: {
    textAlign: 'center',
    color: 'yellow',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    borderColor: 'white',
    borderWidth: 1,

    borderRadius: 12,
    color: 'yellow',
    fontSize: 30,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
  },
  buttonRegister: {
    fontSize: 20,
    color: 'blue',
    fontWeight: 'bold',
  },
  Forgetbutton: {
    fontSize: 10,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
  },
  dontHave: {
    fontSize: 14,
    color: 'grey',
    textAlign: 'center',
    margin: 0,
    
  },
  dontHave2: {
    fontSize: 14,
    color: 'grey',
    bottom:-10,
  left: 100,
    margin: 0,
    
  },

  bio: {
    fontSize: 30,
    textAlign: 'left',
    marginTop: 30,
  },
  bottomTest: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },
  rkButtonHome: {
    backgroundColor: 'white', 
      width: '80%', 
      height: 50,  
      justifyContent: 'center', 
      alignItems: 'center',
      bottom: 50,
      left: 35,
      paddingTop: 10
  },
  feed: {
    
  },

});