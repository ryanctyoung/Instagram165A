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