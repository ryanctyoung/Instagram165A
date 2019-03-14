import React, {Component} from 'react';
import {Platform,Image, StyleSheet, Text, View, Button, TextInput,FlatList,ScrollView, Alert, Dimensions} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import {openDatabase} from 'react-native-sqlite-storage';
import {
	RkButton,
	RkModalImg,
	RkText,
	RkStyleSheet,
	RkTheme
  } from 'react-native-ui-kitten';
import * as  ImagePicker  from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UtilStyles } from '../style/styles';
import GetCurrUser from '../App.js';


export {PostScreen, CreatePost}
var db = openDatabase({name:'users.db'});
class PostScreen extends Component{
	constructor(props)
	{
		super(props);
		this.state = 
		{
			photos:this.props.navigation.params.photos,
			user_name:this.props.navigation.params.user_name,
		}
	}



	render()
	{

		const Description = () =>
		{
			return (<Text >

			 </Text>);
		}
		return(<View>

		</View>); //
	};

}

class CreatePost extends Component{
	static navigationOptions = {
		title: 'Images',
	  };
	
	  items = [
		require('../img/animal.jpeg'),
		require('../img/bird.jpeg'),
		require('../img/clock.jpg'),
		require('../img/flowers.jpeg'),
		require('../img/fireworks.jpeg'),
		require('../img/night.jpeg'),
		require('../img/river.jpeg'),
		require('../img/sea.jpg'),
		require('../img/sun.jpg'),
		require('../img/wood.jpeg'),
		require('../img/flowers.jpeg'),
		require('../img/tree.jpeg'),
	  ];
	  imageSize = (Dimensions.get('window').width - 16) / 3;
	
	  extractGalleryItemKey = (item, index) => index.toString();
	
	  onFooterLikeButtonPress = () => {
		Alert.alert('I Like it!');
	  };
	
	  renderCustomHeader = (options) => (
		<View style={styles.customHeader}>
		  <RkButton
			rkType='clear'
			onPress={options.closeImage}>Close
		  </RkButton>
		  <RkButton rkType='clear'>
			<Icon style={styles.dot} name="circle" />
			<Icon style={styles.dot} name="circle" />
			<Icon style={styles.dot} name="circle" />
		  </RkButton>
		</View>
	  );
	
	  renderCustomFooter = () => (
		<View style={styles.customFooter}>
		  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
			<RkButton
			  rkType='clear small'
			  onPress={this.onFooterLikeButtonPress}>
			  <Icon style={styles.buttonIcon} name="heart" />
			  <RkText rkType='inverse'>18</RkText>
			</RkButton>
		  </View>
		  <View style={{ flex: 1 }}>
			<RkButton rkType='clear small'>
			  <Icon style={styles.buttonIcon} name="comment-o" />
			  <RkText rkType='inverse'>2</RkText>
			</RkButton>
		  </View>
		  <View style={{ flex: 1 }}>
			<RkButton rkType='clear small'>
			  <Icon style={styles.buttonIcon} name="send-o" />
			  <RkText rkType='inverse'>7</RkText>
			</RkButton>
		  </View>
		</View>
	  );
	
	  renderGalleryItemView = ({ item }) => (
		<RkModalImg
		  style={{ width: this.imageSize, height: this.imageSize }}
		  source={item}
		/>
	  );
	
	  renderGallery = () => (
		<FlatList
		  data={this.items}
		  numColumns={3}
		  renderItem={this.renderGalleryItemView}
		  keyExtractor={this.extractGalleryItemKey}
		/>
	  );
	
	  render() {
		
	}
	
	constructor(props)
	{
		super(props);
		this.state = {
			description:'',
			photos:[],
			uid:1 //this.props.navigation.params.uid,
		};
	}



	render()
	{
		const {goBack} = this.props.navigation;
		const {description} = this.state;
		const {uid} = this.state;
		const SubmitPost = () =>
		{
			
			console.log("PostCreation ");
			db.transaction(function(tx)
				{
					//var temp = GetCurrUser().uid;
					console.log("PostCreation ");
					tx.executeSql("INSERT INTO post(uid,caption) VALUES(?,?) ",[uid,description],
            (tx, results) => 
            {
              if(results.rowsAffected > 0)
              {
                console.log("PostCreation ");
              } 
              console.log("PostCreation ");
            }
            );
      tx.executeSql("SELECT * FROM post ",[],
            (tx, results) => 
            {
              if(results.rows.length > 0)
              {
                console.log(results.rows.item(0).post_id + results.rows.item(0).caption);
              }            
              
           		 }
            	);
				
			});
			
		}
		return (
			  <ScrollView
				automaticallyAdjustContentInsets={true}
				style={UtilStyles.container}>
				<View style={profileUI.wrapper}>
          <Text style={profileUI.profileTitle}>  </Text>
          <Image source={require('../img/Agg.png')} style={styless.avatar} />  
          <Text style={profileUI.profileTitle}> Aggie </Text>
		  <View style={profileUI.followStats2} >
           <RkButton rkType='primary' style={UtilStyles.spaceBottom} onPress={()=> navigate('Edit')} > Next </RkButton>
  
           </View>
             
				<View style={[UtilStyles.section, UtilStyles.bordered, styles.imagesContainer]}>
				  <RkText rkType='header' style={styles.header}>Custom header and footer</RkText>
				  <View style={[UtilStyles.rowContainer, { paddingLeft: 2 }]}>
					<RkModalImg
					  style={{ width: this.imageSize, height: this.imageSize }}
					  renderHeader={this.renderCustomHeader}
					  renderFooter={this.renderCustomFooter}
					  headerContentStyle={{ backgroundColor: 'red' }}
					  source={require('../img/post1.png')}
					/>
					<RkModalImg
					  style={{ width: this.imageSize, height: this.imageSize }}
					  renderHeader={this.renderCustomHeader}
					  renderFooter={this.renderCustomFooter}
					  source={require('../img/river.jpeg')}
					/>
					<RkModalImg
					  style={{ width: this.imageSize, height: this.imageSize }}
					  renderHeader={this.renderCustomHeader}
					  renderFooter={this.renderCustomFooter}
					  source={require('../img/fireworks.jpeg')}
					/>
					<RkModalImg
					  style={{ width: this.imageSize, height: this.imageSize }}
					  renderHeader={this.renderCustomHeader}
					  renderFooter={this.renderCustomFooter}
					  headerContentStyle={{ backgroundColor: 'red' }}
					  source={require('../img/sun.jpg')}
					/>
					<RkModalImg
					  style={{ width: this.imageSize, height: this.imageSize }}
					  renderHeader={this.renderCustomHeader}
					  renderFooter={this.renderCustomFooter}
					  source={require('../img/wood.jpeg')}
					/>
					<RkModalImg
					  style={{ width: this.imageSize, height: this.imageSize }}
					  renderHeader={this.renderCustomHeader}
					  renderFooter={this.renderCustomFooter}
					  source={require('../img/post3.png')}/>
				  </View>
				  <View style={profileUI.followStats3} >
           <RkButton rkType='large outline' style={UtilStyles.spaceBottom} onPress={()=> navigate('Edit')} > Camera </RkButton>
		   <RkButton rkType='large outline' style={UtilStyles.spaceBottom} onPress={()=> navigate('Edit')} > Libary </RkButton>
           </View>
				</View>
				
				</View>
			  </ScrollView>
			
		  );
		
	}
}


const PostUI = StyleSheet.create()
{

}

let styles = RkStyleSheet.create(theme => ({
	listContainer: {
	  justifyContent: 'flex-start',
	  alignItems: 'flex-start',
	  flexDirection: 'row',
	},
	imagesContainer: {
	  paddingHorizontal: 0,
	},
	header: {
	  paddingHorizontal: 24,
	},
	customHeader: {
	  justifyContent: 'space-between',
	  alignItems: 'center',
	  flexDirection: 'row',
	},
	customFooter: {
	  justifyContent: 'center',
	  alignItems: 'center',
	  flexDirection: 'row',
	  paddingVertical: 10,
	  paddingHorizontal: 20,
	},
	dot: {
	  fontSize: 6.5,
	  marginLeft: 4,
	  marginVertical: 6,
	  color: theme.colors.text.inverse,
	},
	buttonIcon: {
	  marginRight: 7,
	  fontSize: 19.7,
	  color: theme.colors.text.inverse,
	},
  }));

  const profileUI = StyleSheet.create(
	{
		wrapper: {
		flex: 1,
		bottom: -20,
		margin:1,
		backgroundColor: 'black',      
	  },
	
		followStats:{
		  borderEndWidth:-10,
		  justifyContent: 'center',
		  alignContent:'flex-start',
		  flexDirection:'row',
		  right:-50,
		  bottom:80,
		  color:'blue',
		},
		followStats2:{
		  justifyContent: 'center',
		  alignContent:'center',
		  flexDirection:'row',
		  right:-50,
		  bottom:50,
		  color:'blue',
		},
		followStats3:{
			justifyContent: 'center',
			alignContent:'center',
			flexDirection:'row',
			right:0,
			bottom:-250,
			color:'blue',
		  },
		profiledetail: {
		fontSize: 12,
		fontWeight: 'bold',
		overflow: 'hidden',
		color:'blue',
		padding: 0,
		marginLeft: 20,
	  },
		bio: {
		fontSize: 12,
		fontWeight: 'bold',
		overflow: 'hidden',
		color:'blue',
		padding: 0,
		marginLeft: 20,
		bottom:45
	  },
	
		profileTitle: {
		  color:'darkgreen',fontSize: 15,
		  flex: 1,
		  margin:1,
		fontWeight: 'bold',
	
		}
	});

	let styless = StyleSheet.create({
		screen: {
		  backgroundColor: '#f0f1f5',
		  padding: 12,
		},
		buttonIcon: {
		  marginRight: 7,
		  fontSize: 19.7,
		},
		footer: {
		  marginHorizontal: 16,
		},
		avatar: {
		  width: 42,
		  height: 42,
		  borderRadius: 21,
		  marginRight: 17,
		},
		dot: {
		  fontSize: 6.5,
		  color: '#0000008e',
		  marginLeft: 2.5,
		  marginVertical: 10,
		},
		floating: {
		  width: 56,
		  height: 56,
		  position: 'absolute',
		  zIndex: 200,
		  right: 16,
		  top: 173,
		},
		footerButtons: {
		  flexDirection: 'row',
		},
		overlay: {
		  justifyContent: 'flex-end',
		  paddingVertical: 23,
		  paddingHorizontal: 16,
		},
	  });

	  RkTheme.setType('RkButton', 'example', {
		fontSize: 12,
		width: 150,
		height: 150,
		backgroundColor: 'gray'
		
	  });
	  RkTheme.setType('RkButton', 'example1', {
		fontSize: 12,
		width: 120,
		height:35,
		backgroundColor: 'gray'
		
	  });
	  
	  RkTheme.setType('RkCard', 'story', {
		img: {
		  height: 100,
		  opacity: 0.7
		},
		header: {
		  alignSelf: 'auto'
		},
		content:{
		  alignSelf:'auto'
		}
	  });
	  