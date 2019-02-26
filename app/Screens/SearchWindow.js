import React, {Component} from 'react';
import {FlatList, Platform, StyleSheet, Text, View, Button, TextInput, } from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';


var db = openDatabase({name:'users.db'});
export default class SearchWindow extends Component
{
	constructor(props)
  {
    super(props);
    this.state = {
      input_user_id: '',
      userData: [],
    };
  }


  searchUser = () => {
    const { input_user_id } = this.state;
    


    console.log(this.state.input_user_id);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users where user_name = ?',
        [input_user_id],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
          	var temp = [];
          	temp.push(results.rows.item(0));
            this.setState({
              userData: temp,
            });
          } else {
            alert('No user found');
            this.setState({
              userData: [],
            });
          }
        }
      );
    });
  };

  


  

	render()
	{
		const {userData} = this.state;
		const {navigate} = this.props.navigation;
		ProfilePress = (x) =>
  		{
  			navigate("Profile", {uid:x.user_id, user_name:x.user_name, pho_num:x.phoneNum});
 		}
		searchResult = (item) => {

  		return(
  			<View style = {searchUI.result} >
  			<Button title = {item.user_name} onPress = {() => ProfilePress(item)} />
  			
  			</View>
  			);
  		}


		return(
			<View>
		<TextInput style= {searchUI.input}
          placeholder="Look for your friends here!"
          onChangeText={input_user_id => this.setState({ input_user_id })}
        />
        <Button style = {searchUI.button}
          title="Search"
          onPress={this.searchUser.bind(this)}
        />

        <FlatList
  		data={userData}
  		renderItem={({item}) => searchResult(item)}
		/>

		
		</View>

			);
		
	}

}


const searchUI = StyleSheet.create(
{
	input :{
		fontSize: 20,
	},

	result:{
		alignItems:'flex-start',
		alignContent:'flex-start',
		justifyContent: 'space-around',
		direction:'ltr',
		fontSize: 30,
	},

	button:{
		width: 40,
		height:30,
		backgroundColor: 'powderblue',
	},
}
		);