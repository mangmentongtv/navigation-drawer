import React from 'react';
import { View, StatusBar, AsyncStorage } from 'react-native';
import { Text, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from '../../../assets/styles/styles';

export default class Main extends React.Component {

  constructor(props) {
    super(props)

    this.state = {}
  }

  componentWillMount() {
    //
    // check if user is logged in
    //
    AsyncStorage.getItem('userLoggedIn', (err, userData) => {
      if(userData === null || userData === undefined || userData === '') {
        return false;
      }else{
        Actions.drawer({type: 'reset'});
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <View style={styles.mainWrapper}>
          <Text style={styles.mainLogo}>Your Logo</Text>
        </View>
        <Button style={styles.btnPrimary} full onPress={() => this.signUp()}>
          <Text style={styles.btnTxt}>JOIN FOR FREE</Text>
        </Button>
        <Button style={styles.btnSecondary} full onPress={() => this.signIn()}>
          <Text style={styles.btnTxt}>Already have an account? SIGN IN</Text>
        </Button>
      </View>
    );
  }

  signIn() {
    Actions.signin();
  }

  signUp() {
    Actions.signup();
  }
}
