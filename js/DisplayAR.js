import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { ViroARSceneNavigator } from 'react-viro';
import HomePage from './HomePage';
import InitialARScene from './HelloWorldSceneAR';
// import { viroKey } from '../secrets';

const apiKey = 'D09E03E6-54C9-48B1-BB65-EC71FB38943D';

export default class DisplayAR extends Component {
  constructor() {
    super();
    this.state = {
      run: true,
    };
    this.goToHomePage = this.goToHomePage.bind(this);
  }

  goToHomePage() {
    Actions.HomePage();
  }

  render() {
    if (this.state.run) {
      return (
        <ViroARSceneNavigator
          apiKey={apiKey}
          initialScene={{ scene: InitialARScene }}
        />
      );
    } else {
      return <HomePage />;
    }
  }
}
