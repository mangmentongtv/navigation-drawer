import React from 'react';
import { View, Alert, AsyncStorage } from 'react-native';
import { Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import HeaderSign from '../../components/Header/HeaderSign';
import styles from '../../../assets/styles/styles';
import { Actions } from 'react-native-router-flux';

export default class Signin extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      yourEmail: '',
      yourPassword: '',
      btnDisable: false,

      //
      // ignore this state
      //
      matchEmail: '',
      matchPassword: ''
    }
  }

  componentWillMount() {
    //
    // check login user this is for the sample data only since i dont have backend api. ignore this function
    //
    AsyncStorage.getItem('userData', (err, userData) => {
      if(userData === null || userData === undefined || userData === '') {
        this.setState({
          matchEmail: '',
          matchPassword: ''
        });
      }else{
        var data = JSON.parse(userData);
        this.setState({
          matchEmail: data.yourEmail,
          matchPassword: data.yourPassword
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.signWrapper}>
        <HeaderSign title="Sign In"/>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Your Email</Label>
              <Input 
                style={styles.signTxt}
                onChangeText={(txt) => this.setState({yourEmail: txt})}
                value={this.state.yourEmail}
                keyboardType="email-address"
                />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input 
                style={styles.signTxt}
                onChangeText={(txt) => this.setState({yourPassword: txt})}
                value={this.state.yourPassword}
                secureTextEntry={true}
                />
            </Item>
          </Form>
        </Content>
        <Button style={styles.btnPrimary} full onPress={() => this.login()} disabled={this.state.btnDisable}>
          <Text style={styles.btnTxt}>LOGIN</Text>
        </Button>
      </View>
    );
  }

  login() {
    this.setState({btnDisable: true});

    if(this.state.yourEmail === '') {
      this.setState({btnDisable: false});
      Alert.alert('Required', 'Your email is required');
      return false;
    }

    if(this.state.yourPassword === '') {
      this.setState({btnDisable: false});
      Alert.alert('Required', 'Your password is required');
      return false;
    }

    //
    // Add your backend api here
    //

    //
    // sample error message when api backend deny your request
    //
    if(this.state.matchEmail === '' && this.state.matchPassword === '') {
      this.setState({btnDisable: false});
      Alert.alert('Access Denies', 'Email and password wont find. Try again or register');
      return false;
    }

    AsyncStorage.setItem('userLoggedIn', 'YES');
    Actions.drawer({type: 'reset'});
  }
}
