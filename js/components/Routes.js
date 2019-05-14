import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import DisplayAR from './DisplayAR';
import HomePage from './HomePage';
import Products from './Products';
import Menu from './Menu';
import Account from './Account'

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
          <Scene key="DisplayAR" component={DisplayAR} hideNavBar="true" />
          <Scene key="Products" component={Products} hideNavBar="true" />
          <Scene key="Menu" component={Menu} hideNavBar="true" />
          <Scene key="Account" component={Account} hideNavBar="true" />
        </Scene>
      </Router>
    );
  }
}
