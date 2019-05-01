import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import DisplayAR from './DisplayAR';
import HomePage from './HomePage';

export default class Routes extends React.Component {
  render() {
    return (
      <Router hideNavBar="true">
        <Scene key="root">
          <Scene
            key="HomePage"
            component={HomePage}
            title="HomePage"
            initial={true}
          />
          <Scene key="DisplayAR" component={DisplayAR} title="DisplayAR" />
        </Scene>
      </Router>
    );
  }
}
