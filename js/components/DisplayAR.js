import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { ViroARSceneNavigator } from 'react-viro';
import HomePage from './HomePage';
import InitialARScene from './HelloWorldSceneAR';
import { View } from 'native-base';
import { StatusBar, StyleSheet } from 'react-native';
// import { viroKey } from '../secrets';
import AddButton from './AddButton';

const apiKey = 'D09E03E6-54C9-48B1-BB65-EC71FB38943D';

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
          apiKey={apiKey}
          initialScene={{ scene: InitialARScene }}
        />
        <AddButton />
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
});
