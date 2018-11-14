import React from 'react';
import { View, Modal, Alert, AsyncStorage } from 'react-native';
import { Text, Button, Thumbnail } from 'native-base';
import styles from '../../../../assets/styles/styles';
import HeaderBack from '../../../components/Header/HeaderBack';
import { Camera, Permissions, ImagePicker } from 'expo';
import { Entypo, AntDesign, Ionicons } from '@expo/vector-icons';

export default class Avatar extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      avatar: '',
      cameraPermission: null,
      cameraRollPermission: null,
      type: Camera.Constants.Type.back,
      cameraModal: false
    }
  }

  async componentDidMount() {
    const { camera_status } = await Permissions.askAsync(Permissions.CAMERA);
    const { camera_roll_status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ 
      cameraPermission: camera_status === 'granted',
      cameraRollPermission: camera_roll_status === 'granted'
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderBack title="Update Avatar"/>
        <View style={styles.separatorWrapper}>
          <Thumbnail 
              large
              source={{uri: (this.state.avatar === '') ? this.props.avatar : this.state.avatar}}
              />
        </View>
        <Button style={styles.btnPrimary} full onPress={() => this.selectPhoto()}>
          <Text style={styles.btnTxt}>SELECT PHOTO</Text>
        </Button>
        {this.renderCameraModal()}
      </View>
    );
  }

  renderCameraModal() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.cameraModal}
        onRequestClose={() => this.setState({cameraModal: false})}>
        <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => { this.camera = ref; }} >
            <View style={{flex: 1, backgroundColor: 'transparent'}}>
              <View style={{flex: 6}}>
                <View style={{marginTop: 30, flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Ionicons 
                      name="ios-reverse-camera" 
                      size={35} 
                      color={'#fff'} 
                      onPress={() => this.switchCamera()}
                      style={{alignSelf: 'flex-start', marginLeft: 15}}
                      />
                  </View>
                  <View style={{flex: 1}}>
                    <AntDesign 
                      name="close" 
                      size={30} 
                      color={'#fff'} 
                      onPress={() => this.setState({cameraModal: false})}
                      style={{alignSelf: 'flex-end', marginRight: 15}}
                      />
                  </View>
                </View>
              </View>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Entypo name="circle" size={80} color={'#fff'} onPress={() => this.takePhoto()}/>
              </View>
            </View>
        </Camera>
      </Modal>
    )
  }

  switchCamera() {
    this.setState({
      type: this.state.type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    });
  }

  selectPhoto() {
    Alert.alert(
      'Select Photo',
      'You can use camera or your image gallery',
      [
        {text: 'Cancel', onPress: () => {return false}, style: 'cancel'},
        {text: 'Gallery', onPress: () => {this.imagePickerView()}},
        {text: 'Camera', onPress: () => {this.setState({cameraModal: true})}},
      ]
    )
  }

  async takePhoto() {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      this.setState({ avatar: photo.uri, cameraModal: false });
      AsyncStorage.setItem('avatarImg', photo.uri);
    }
  }

  async imagePickerView() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ avatar: result.uri });
      AsyncStorage.setItem('avatarImg', result.uri);
    }else{
      return false;
    }
  }
}
