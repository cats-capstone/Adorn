import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { ViroARSceneNavigator } from 'react-viro';
import HomePage from './HomePage';
import InitialARScene from './InitialARScene';
import { View, Button, Icon, Footer, Text } from 'native-base';
import { StatusBar, StyleSheet, TouchableHighlight } from 'react-native';
// import { viroKey } from '../secrets';
import AddButton from './AddButton';

const apiKey = 'D09E03E6-54C9-48B1-BB65-EC71FB38943D';

export default class DisplayAR extends Component {
  constructor() {
    super();
    this.state = {
      run: true,
      popupHidden: true
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
        <View style={localStyles.noFlex}>
          <Icon
            name="ios-add-circle-outline"
            onPress={() => {
              if (this.state.popupHidden) {
                this.setState({popupHidden: false})
              }
              else {
                this.setState({popupHidden: true})
              }
              
              // Actions.Products();
            }}
            style={localStyles.icon}
          />
          {this.state.popupHidden ? <Text>Hello I am a popup</Text> : <Text></Text>}
          
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
