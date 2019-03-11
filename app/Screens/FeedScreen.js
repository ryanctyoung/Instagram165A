import React, {Component} from 'react';
import {Platform,Image, StyleSheet, Text, View, Button, TextInput, TouchableHighlight,FlatList, ScrollView} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import {createDrawerNavigator} from 'react-navigation';
import * as  ImagePicker  from 'react-native-image-picker';
import { RkButton,RkText,RkCard,RkTheme, } from 'react-native-ui-kitten';
import { Avatar } from '../components/avatar';
import { UtilStyles } from '../style/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ImageIcon } from '../components/imageIcon';

var db = openDatabase({name:'users.db'});
export default class FeedScreen extends Component{

  RetrievePosts()
  {
    var temp = [];
      db.transaction(function(tx) {
        tx.executeSql(
          '',[],
          (tx,results) =>{

          }
          );
        /*
        for(let i = 0; i < results.rows.length; ++i)
        {
            temp.push(results.rows.item[i]);
        }

        */
      });
      this.setState({
        posts:temp
      });
  }

  constructor(props)
  {
    super(props);
    this.state = {
      posts:[],
    };

  }

  componentDidMount()
    {
      //this.RetrievePosts();
    }

    static navigationOptions = {
      title: 'AggieGrams',
    };
  
  /*
  const PostItem = (item) =>
  {
    #likes
    #comment
    #share
    caption
    imagePost
    Username
    ProfilePic
  return (
    <RkCard>  
            <View rkCardHeader={true}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={require('profilePicture')} style={styles.avatar} />
                <View style={{}}>
                  <RkText rkType='header'>Username</RkText>
                </View>
              </View>
              <RkButton rkType='clear'>
                <Icon style={styles.dot} name="circle" />
                <Icon style={styles.dot} name="circle" />
                <Icon style={styles.dot} name="circle" />
              </RkButton>
            </View>
            <Image rkCardImg={true} source={require(imagePost)} />
            <View rkCardContent={true}>
              <RkText rkType='hero'>
                caption
              </RkText>
            </View>
            <View rkCardFooter={true} style={styles.footer}>
              <RkButton rkType='clear link accent'>
                <Icon name="heart" style={likeStyle} />
                <RkText rkType='accent'>#likes</RkText>
              </RkButton>
              <RkButton rkType='clear link'>
                <Icon name="comment-o" style={iconButton} />
                <RkText rkType='hint'>#comment</RkText>
              </RkButton>
              <RkButton rkType='clear link'>
                <Icon name="send-o" style={iconButton} />
                <RkText rkType='hint'>#Share</RkText>
              </RkButton>
            </View>
          </RkCard>

  );
  }

  <FlatList
  data={posts}
  renderItem={({item}) => PostItem(item)}
  />
  */
  render()
  {
    const{posts} = this.state
    const PostItem = (item) => {
      src = "";

      return(<TouchableHighlight > 
      <Image source = {src} />
      </TouchableHighlight>);
    }
    const FeedPosts = () =>{
      return (
        <View>
        <FlatList data = {posts} renderItem = {(item)=>PostItem(item)} />
        </View>
        );
    }
    
    SearchOn = () => {

    this.props.navigation.navigate('Search');
    
    };
    const likeStyle = [styles.buttonIcon, { color: RkTheme.colors.accent }];
    const iconButton = [styles.buttonIcon, { color: RkTheme.current.colors.text.hint }];
    return (
      <ScrollView
      automaticallyAdjustContentInsets={true}
      style={UtilStyles.container}>
       <View style = {feedUI.wrapper}> 
       <View style={UtilStyles.columnContainer}>
          <Avatar rkType='round'
            source={require('../img/avatars/Ava1.png')}
            name='Mona Lisa'
          />
        </View>
    <Text style={feedUI.label}>If there is a will, there is awalys be a way</Text>
    <FeedPosts/>
    <Button style={feedUI.searchbutton} onPress = {()=> SearchOn()} title='Search'/>
    </View>
<View style={{ flex: 1 }}>
      <RkCard>  
            <View rkCardHeader={true}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={require('../img/cow.png')} style={styles.avatar} />
                <View style={{}}>
                  <RkText rkType='header'>UC Davis Aggies</RkText>
                  <RkText rkType='subtitle'>7 minutes ago</RkText>
                </View>
              </View>
              <RkButton rkType='clear'>
                <Icon style={styles.dot} name="circle" />
                <Icon style={styles.dot} name="circle" />
                <Icon style={styles.dot} name="circle" />
              </RkButton>
            </View>
            <Image rkCardImg={true} source={require('../img/giphy.gif')} />
            <View rkCardContent={true}>
              <RkText rkType='hero'>
                That Feeling when you know you're almost done with the Quarter!
              </RkText>
            </View>
            <View rkCardFooter={true} style={styles.footer}>
              <RkButton rkType='clear link accent'>
                <Icon name="heart" style={likeStyle} />
                <RkText rkType='accent'>12,531</RkText>
              </RkButton>
              <RkButton rkType='clear link'>
                <Icon name="comment-o" style={iconButton} />
                <RkText rkType='hint'>5671</RkText>
              </RkButton>
              <RkButton rkType='clear link'>
                <Icon name="send-o" style={iconButton} />
                <RkText rkType='hint'>5K</RkText>
              </RkButton>
            </View>
          </RkCard>
          <RkCard>  
            <View rkCardHeader={true}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={require('../img/cow.png')} style={styles.avatar} />
                <View style={{}}>
                  <RkText rkType='header'>UC Davis Aggies</RkText>
                  <RkText rkType='subtitle'>25 minutes ago</RkText>
                </View>
              </View>
              <RkButton rkType='clear'>
                <Icon style={styles.dot} name="circle" />
                <Icon style={styles.dot} name="circle" />
                <Icon style={styles.dot} name="circle" />
              </RkButton>
            </View>
            <Image rkCardImg={true} source={require('../img/Aggie.gif')} />
            <View rkCardContent={true}>
              <RkText rkType='hero'>
                That Feeling when you know you're almost done with the Quarter!
              </RkText>
            </View>
            <View rkCardFooter={true} style={styles.footer}>
              <RkButton rkType='clear link accent'>
                <Icon name="heart" style={likeStyle} />
                <RkText rkType='accent'>12,531</RkText>
              </RkButton>
              <RkButton rkType='clear link'>
                <Icon name="comment-o" style={iconButton} />
                <RkText rkType='hint'>5671</RkText>
              </RkButton>
              <RkButton rkType='clear link'>
                <Icon name="send-o" style={iconButton} />
                <RkText rkType='hint'>5K</RkText>
              </RkButton>
            </View>
          </RkCard>
      </View>
      </ScrollView>
    );
  }
}

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

RkTheme.setType('RkText','hero',{
  fontSize: 15,
  color:'darkgreen'
 });

let styles = StyleSheet.create({
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


const feedUI = StyleSheet.create(
  {
    wrapper : {
      backgroundColor: 'black',
    },

    label:{
      fontSize: 15,
    color: 'grey',
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    fontStyle: 'italic'
    },

    searchbutton:{
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
  }
);