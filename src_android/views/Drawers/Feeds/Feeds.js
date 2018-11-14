import React from 'react';
import { View, ActivityIndicator, Image } from 'react-native';
import { Text, Content, Card, CardItem, Thumbnail, Left, Body, Right } from 'native-base';
import styles from '../../../../assets/styles/styles';
import HeaderDefault from '../../../components/Header/HeaderDefault';
import axios from 'axios';

export default class Feeds extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      data: []
    }
  }

  componentWillMount() {
    //
    // sample fetch api from sub reddit
    //
    var url = 'https://www.reddit.com/r/wtfstockphotos.json';
    axios.get(url).then(res => {
      this.setState({data: res.data.data.children, loading: false});
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderDefault title="Feeds"/>
        {this.renderFeeds()}
      </View>
    );
  }

  renderFeeds() {
    if(this.state.loading === true) {
      return(
        <View style={styles.separatorWrapper}>
          <ActivityIndicator />
        </View>
      )
    }else{
      if(this.state.data.length === 0) {
        return(
          <View style={styles.separatorWrapper}>
            <Text style={styles.subTitleTxt}>No Data</Text>
          </View>
        )
      }else{
        return(
          <Content padder>
            {this.state.data.map((item, i) => {
              return(
                <Card key={i}>
                  <CardItem>
                    <Left>
                      <Thumbnail source={{uri: item.data.thumbnail}} />
                      <Body>
                        <Text style={styles.titleTxt}>{item.data.author}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem cardBody>
                    <Image source={{uri: item.data.url}} style={{height: 300, width: '100%'}}/>
                  </CardItem>
                </Card>
              )
            })}
          </Content>
        )
      }
    }
  }
}
