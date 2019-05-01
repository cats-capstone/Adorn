import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import App from './App.js';

export default class RnrfExample extends Component {
  render() {
    return <App />;
  }
}

AppRegistry.registerComponent('CatsCapstone', () => App);

// The below line is necessary for use with the TestBed App
AppRegistry.registerComponent('ViroSample', () => App);
