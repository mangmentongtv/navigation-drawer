import React from 'react';
import { View, AsyncStorage, TouchableWithoutFeedback } from 'react-native';
import { Content, Text, ListItem, List, Left, Body, Right, Thumbnail, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from '../../../assets/styles/styles';
import { AntDesign } from '@expo/vector-icons';

export default class DrawerContent extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
        avatar: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
        yourFullName: ''
    }
  }

  componentWillMount() {
    //
    // check login user this is for the sample data only since i dont have backend api. ignore this function
    //

    AsyncStorage.getItem('userData', (err, userData) => {
      var data = JSON.parse(userData);
      this.setState({yourFullName: data.yourFullName});
    });
    this.checkAvatar();
  }

  componentDidUpdate() {
      setTimeout(() => {
        this.checkAvatar();
      }, 1500);
  }

  componentWillUnmount() {
    this.checkAvatar();
  }

  checkAvatar() {
    AsyncStorage.getItem('avatarImg', (err, avatarImg) => {
        if(avatarImg === null || avatarImg === undefined || avatarImg === '') {
            return false;
        }else{
            this.setState({avatar: avatarImg});
        }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.drawerTopContent}>

            <TouchableWithoutFeedback onPress={() => this.updateAvatar()}>
                <Thumbnail 
                    large
                    source={{uri: this.state.avatar}}
                    />
            </TouchableWithoutFeedback>
            
            <View style={styles.profileWrapper}>
                <Text style={styles.drawerTxtProfileName}>{this.state.yourFullName}</Text>
            </View>
        </View>
        <View style={styles.drawerListContent}>
            <Content>
                <List>
                    <ListItem icon onPress={() => Actions.feeds()}>
                        <Left>
                            <AntDesign name="bars" size={20} />
                        </Left>
                        <Body>
                            <Text style={styles.drawerTxtList}>FEEDS</Text>
                        </Body>
                        <Right />
                    </ListItem>
                    <ListItem icon onPress={() => Actions.about()}>
                        <Left>
                            <AntDesign name="infocirlceo" size={20} />
                        </Left>
                        <Body>
                            <Text style={styles.drawerTxtList}>ABOUT</Text>
                        </Body>
                        <Right />
                    </ListItem>
                    <ListItem icon onPress={() => this.logout()}>
                        <Left>
                            <AntDesign name="logout" size={20} />
                        </Left>
                        <Body>
                            <Text style={styles.drawerTxtList}>LOGOUT</Text>
                        </Body>
                        <Right />
                    </ListItem>
                </List>
            </Content>
        </View>
      </View>
    );
  }

  updateAvatar() {
    Actions.avatar({avatar: this.state.avatar});
  }

  logout() {
    AsyncStorage.removeItem('userLoggedIn');
    Actions.main({type: 'reset'});
  }
}
