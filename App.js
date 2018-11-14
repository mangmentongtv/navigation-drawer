import React from 'react';
import { Platform } from 'react-native';
import { AppLoading, Font } from 'expo';
import Routes from './src_ios/routes/Routes';
import AndroidRoutes from './src_android/routes/Routes';

export default class App extends React.Component {

  constructor(){
    super()

    this.state = {
      loading: true,
      fontsLoaded: false
    }
  }

  componentWillMount() {
    this.fontLoad();
  }

  async fontLoad() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),

      //
      // import your own font
      //
      'OpenSans-Bold': require('./assets/fonts/Open_Sans/OpenSans-Bold.ttf'),
      'OpenSans-ExtraBold': require('./assets/fonts/Open_Sans/OpenSans-ExtraBold.ttf'),
      'OpenSans-Light': require('./assets/fonts/Open_Sans/OpenSans-Light.ttf'),
      'OpenSans-Regular': require('./assets/fonts/Open_Sans/OpenSans-Regular.ttf'),
      'OpenSans-SemiBold': require('./assets/fonts/Open_Sans/OpenSans-SemiBold.ttf')

    });

    this.setState({fontsLoaded: true, loading: false});
  }

  render() {
    if(this.state.loading === true) {
      return (
        <AppLoading />
      )
    }else{
      if(Platform.OS === 'ios') {
        return (
          <Routes />
        );
      }else{
        return (
          <AndroidRoutes />
        );
      }
    }
  }
}
