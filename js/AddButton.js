'use strict';

import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, Image, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Tick from './TickSvg';

export default class AddButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor="#00000000"
        onPress={() => {
          Actions.HomePage();
        }}
      >
        <View>
          <Tick />
        </View>
      </TouchableHighlight>
    );
  }
}
