import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { ViroARSceneNavigator } from 'react-viro';
import HomePage from './HomePage';
import InitialARScene from './InitialARScene';
import { View, Button, Icon, Footer } from 'native-base';
import { StatusBar, StyleSheet, TouchableHighlight } from 'react-native';
import { VIRO_KEY } from '../../secrets';
import AddButton from './AddButton';

export default class DisplayAR extends Component {
  constructor() {
    super();
    this.state = {
      run: true,
    };
  }

  render() {
    return (
      <View style={localStyles.flex}>
        <StatusBar hidden={true} />
        <ViroARSceneNavigator
          style={localStyles.arView}
          apiKey={VIRO_KEY}
          initialScene={{ scene: InitialARScene }}
        />
        <View style={localStyles.noFlex}>
          <Icon
            name="ios-add-circle-outline"
            onPress={() => {
              Actions.Products();
            }}
            style={localStyles.icon}
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
    // position: 'absolute',
    height: 58,
    width: 58,
    top: 10,
    left: 10,
  },
  noFlex: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});
