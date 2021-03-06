import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { ViroARSceneNavigator } from 'react-viro';
import { View, Icon, Button, Text, Card, CardItem, Left } from 'native-base';
import { StatusBar, StyleSheet, Modal } from 'react-native';
import { VIRO_KEY } from '../../secrets';
import { connect } from 'react-redux';
import { deleteModel } from '../store/2Ditems';

let InitialARScene = require('./InitialARScene');

export default class DisplayAR extends Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
    };
  }

  openModal = () => this.setState({ modalVisible: true });
  closeModal = () => this.setState({ modalVisible: false });

  render() {
    return (
      <View style={localStyles.flex}>
        <StatusBar hidden={true} />
        <ViroARSceneNavigator
          style={localStyles.arView}
          apiKey={VIRO_KEY}
          initialScene={{ scene: InitialARScene }}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <View style={localStyles.modalContainer}>
            <Card style={{ borderRadius: 4 }}>
              {this.props.objects.map(item => (
                <CardItem key={item.id}>
                  <Left>
                    <Text>{item.name}</Text>
                  </Left>
                  <Icon
                    name="ios-trash"
                    style={{ fontSize: 30 }}
                    onPress={() => {
                      this.props.deleteModel(item.id);
                    }}
                  />
                </CardItem>
              ))}
            </Card>

            <Button
              block
              style={{ backgroundColor: '#8754B4', borderRadius: 4 }}
              onPress={this.closeModal}
            >
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
          <Icon name="ios-save" style={localStyles.icon} />
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
    borderRadius: 4,
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
