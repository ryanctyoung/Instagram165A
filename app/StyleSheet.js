import {Platform, StyleSheet, Text, View, Button, TextInput, } from 'react-native';
export {styles};
const styles = StyleSheet.create({
welcomewrap: {
  flex: 1,
  marginTop: 75
},

wrapper: {
    flex: 1,
    marginTop: 50,
    backgroundColor: 'lightblue',
  },
submitButton: {
    paddingHorizontal: 10,
    color: 'yellow',
    paddingTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'yellow',
    backgroundColor: 'lightblue',
  },
  welcome: {
    fontSize: 50,
    color: 'yellow',
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    marginBottom:  175,
  },
  register: {
    fontSize: 15,
    color: 'yellow',
    textAlign: 'left',
    margin: 1,
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

    
  


  bio: {
    fontSize: 30,
    textAlign: 'left',
    marginTop: 30,
  },

  feed: {
    
  },

});