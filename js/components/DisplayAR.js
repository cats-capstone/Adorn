import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { ViroARSceneNavigator } from 'react-viro';
import InitialARScene from './InitialARScene';
import { View, Icon, Button, Text, Card, CardItem, Right } from 'native-base';
import { StatusBar, StyleSheet, Modal } from 'react-native';
import { VIRO_KEY } from '../../secrets';
import { connect } from 'react-redux';
import { deleteModel } from '../store/2Ditems';

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
    console.log('PROPS.OBJECTS', this.props.objects);
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
        >
          <View style={localStyles.modalContainer}>
            <Card>
              {this.props.objects.map(item => (
                <CardItem>
                  <Text>{item.name}</Text>
                  <Right>
                    <Icon
                      name="ios-trash"
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
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: '#C0C0C0',
    borderWidth: 2,
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
