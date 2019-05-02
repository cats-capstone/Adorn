import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import DisplayAR from './DisplayAR';
import HomePage from './HomePage';

export default class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            key="HomePage"
            component={HomePage}
            title="HomePage"
            initial={true}
            hideNavBar="true"
          />
          <Scene key="DisplayAR" component={DisplayAR} />
        </Scene>
      </Router>
    );
  }
}
