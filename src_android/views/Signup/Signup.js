import React from 'react';
import { View, Alert, AsyncStorage } from 'react-native';
import { Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import HeaderSign from '../../components/Header/HeaderSign';
import styles from '../../../assets/styles/styles';
import { Actions } from 'react-native-router-flux';

export default class Signup extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      yourFullName: '',
      yourEmail: '',
      yourPassword: '',
      repeatPassword: '',
      btnDisable: false
    }
  }

  render() {
    return (
      <View style={styles.signWrapper}>
        <HeaderSign title="Join for Free"/>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label style={styles.signTxt}>Your Fullname</Label>
              <Input 
                style={styles.signTxt}
                onChangeText={(txt) => this.setState({yourFullName: txt})}
                value={this.state.yourFullName}
                />
            </Item>
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
              <Label>Your Password</Label>
              <Input 
                style={styles.signTxt}
                onChangeText={(txt) => this.setState({yourPassword: txt})}
                value={this.state.yourPassword}
                secureTextEntry={true}
                />
            </Item>
            <Item floatingLabel last>
              <Label>Repeat Password</Label>
              <Input 
                style={styles.signTxt}
                onChangeText={(txt) => this.setState({repeatPassword: txt})}
                value={this.state.repeatPassword}
                secureTextEntry={true}
                />
            </Item>
          </Form>
        </Content>
        <Button style={styles.btnPrimary} full onPress={() => this.join()} disabled={this.state.btnDisable}>
          <Text style={styles.btnTxt}>REGISTER</Text>
        </Button>
      </View>
    );
  }

  join() {
    this.setState({btnDisable: true});

    if(this.state.yourFullName === '') {
      this.setState({btnDisable: false});
      Alert.alert('Required', 'Your fullname is required');
      return false;
    }

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

    if(this.state.yourPassword.length < 6) {
      this.setState({btnDisable: false});
      Alert.alert('Required', 'Password atleast 6 characters');
      return false;
    }

    if(this.state.repeatPassword === '') {
      this.setState({btnDisable: false});
      Alert.alert('Required', 'Repeat password is required');
      return false;
    }

    if(this.state.repeatPassword !== this.state.yourPassword) {
      this.setState({btnDisable: false});
      Alert.alert('Required', 'Repeat password is not match to password');
      return false;
    }

    //
    // sample save data (replace with your backend API)
    //
    var saveData = {
      yourFullName: this.state.yourFullName,
      yourEmail: this.state.yourEmail,
      yourPassword: this.state.yourPassword
    };

    AsyncStorage.removeItem('userData');
    AsyncStorage.setItem('userLoggedIn', 'YES');
    AsyncStorage.setItem('userData', JSON.stringify(saveData));
    Actions.drawer({type: 'reset'});
  }
}
