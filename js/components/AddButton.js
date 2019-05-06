'use strict';

import React, { Component } from 'react';
import { TouchableHighlight, View, StyleSheet } from 'react-native';
import { Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class AddButton extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <TouchableHighlight underlayColor="#00000000">
        <View>
          <Button transparent>
            <Icon
              name="ios-add-circle-outline"
              onPress={() => {
                Actions.Products();
              }}
              style={localStyles.AddButton}
            />
          </Button>
        </View>
      </TouchableHighlight>
    );
  }
}

const localStyles = StyleSheet.create({
  AddButton: {
    position: 'absolute',
    height: 90,
    width: 90,
    left: 0,
    alignSelf: 'center',
  },
});
