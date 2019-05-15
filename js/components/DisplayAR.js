import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { ViroARSceneNavigator, ViroConstants } from 'react-viro';
import { View, Icon, Button, Text, Card, CardItem, Right } from 'native-base';
import { StatusBar, StyleSheet, Modal, Alert } from 'react-native';
import { VIRO_KEY } from '../../secrets';
import { connect } from 'react-redux';
import { deleteModel } from '../store/2Ditems';
import { database, auth } from '../../firebase';

let InitialARScene = require('./InitialARScene');

export default class DisplayAR extends Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      screenshots: 1,
    };
    this.setRef = this.setRef.bind(this);
    this.screenshot = this.screenshot.bind(this);
  }

  setRef(component) {
    this.arRef = component;
  }
  openModal = () => this.setState({ modalVisible: true });
  closeModal = () => this.setState({ modalVisible: false });
  screenshot = () => {
    this.arRef.sceneNavigator
      .takeScreenshot('saved-room', false)
      .then(redirect => {
        if (!redirect.success) {
          if (redirect.error == ViroConstants.RECORD_ERROR_NO_PERMISSION) {
            Alert.alert(
              'Screenshot Error',
              'Please allow camera permissions',
              [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
              { cancelable: false }
            );
          }
        } else if (redirect.success) {
          Alert.alert(
            'Sucess!',
            'Your room has been saved',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
          );
        }
      });
  };

  render() {
    return (
      <View style={localStyles.flex}>
        <StatusBar hidden={true} />
        <ViroARSceneNavigator
          style={localStyles.arView}
          apiKey={VIRO_KEY}
          initialScene={{ scene: InitialARScene }}
          ref={this.setRef}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {this.setState({ modalVisible: false })}}
        >
          <View style={localStyles.modalContainer}>
            <Card>
            {this.props.objects.map(item => (
                <CardItem key={item.id}>
                  <Text>{item.name}</Text>
                  <Right>
                    <Icon
                      name="ios-trash"
                      style={{ fontSize: 30 }}
                      onPress={() => {
                        this.props.deleteModel(item.id);
                      }}
                    />
                  </Right>
                </CardItem>
              
            ))}
            </Card>

            <Button onPress={this.closeModal}>
              <Text>Close</Text>
            </Button>
          </View>
        </Modal>
        <View style={localStyles.addIcon}>
          <Icon
            name="ios-add-circle-outline"
            onPress={() => {
              Actions.Products();
            }}
            style={localStyles.icon}
          />
        </View>
        <View style={localStyles.saveIcon}>
          <Icon
            name="ios-save"
            style={localStyles.icon}
            onPress={this.screenshot}
          />
        </View>
        <View style={localStyles.deleteIcon}>
          <Icon
            name="ios-trash"
            style={localStyles.icon}
            onPress={this.openModal}
          />
        </View>
      </View>
    );
  }
}

var localStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  arView: {
    flex: 1,
  },
  icon: {
    fontSize: 50,
    flex: 3,
  },
  addIcon: {
    position: 'absolute',
    bottom: 25,
    left: 185,
  },
  deleteIcon: {
    position: 'absolute',
    bottom: 25,
    right: 30,
  },
  saveIcon: {
    position: 'absolute',
    bottom: 25,
    left: 30,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0)',
    marginHorizontal: 60,
    marginVertical: 120,
  },
});

const mapState = state => {
  return {
    objects: state.itemsReducers.models,
  };
};

const mapDispatch = dispatch => {
  return {
    deleteModel: itemId => dispatch(deleteModel(itemId)),
  };
};

module.exports = connect(
  mapState,
  mapDispatch
)(DisplayAR);
