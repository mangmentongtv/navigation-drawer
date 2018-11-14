import React from 'react';
import { View } from 'react-native';
import { Text, Content } from 'native-base';
import styles from '../../../../assets/styles/styles';
import HeaderDefault from '../../../components/Header/HeaderDefault';

export default class About extends React.Component {

  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderDefault title="About"/>
        <Content padder>
          <Text style={styles.descTxt}>
            This is a sample of navigation with drawer. You can use this to your project as a starter and improve this layout.
            Thanks and have fun. Happy Coding
          </Text>
        </Content>
      </View>
    );
  }
}
