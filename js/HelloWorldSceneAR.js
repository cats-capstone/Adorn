'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARPlane,
  ViroBox,
  Viro3DObject,
  ViroAmbientLight,
  ViroNode
} from 'react-viro';

import { Actions } from 'react-native-router-flux';



export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();
    this.state = {
      text: 'Initializing AR...',
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onLoadEnd = this._onLoadEnd.bind(this)
    this._onLoadStart = this._onLoadStart.bind(this)
  }

  render() {
    console.log('IN RENDER!')
    return (
      <ViroARScene ref="arscene" onTrackingUpdated={this._onInitialized} >
                  <ViroNode>
                  <ViroAmbientLight color="#FFFFFF" />
                  {/* <Viro3DObject source={require('./res/Eames-chair-DSW.obj')}
                        resources={[require('./res/teak_B.jpg'),
                                    require('./res/teak_R.jpg'),
                                    require('./res/teak_D.jpg')]}
                        position={[0, 0, 0]}
                        scale={[.01, .01, .01]}
                        type='OBJ'
                        onLoadStart={this._onLoadStart}/> */}

                  <Viro3DObject source={require('./res/object_flowers/object_flowers.vrx')}
                                resources={[require('./res/object_flowers/object_flowers_diffuse.png'),
                                            require('./res/object_flowers/object_flowers_normal.png'),
                                            require('./res/object_flowers/object_flowers_specular.png')]}
                                position={[0, 0, 0]}
                                scale={[.5, .5, .5]}
                                type="VRX"/>
                  </ViroNode>
          
          
                        
      </ViroARScene>
    );
  }

  initialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: 'Hello World!',
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  _onLoadStart() {
    console.log('STARTED LOADING!')
  }

  _onLoadEnd() {
    this.refs["arscene"].getCameraOrientationAsync().then(orientation => {
      console.log('got camera orientation!', orientation)
      this.refs["arscene"].performARHitTestWithRay(orientation.forward).then(results => {
        console.log('hit test results!', results)
      })
    })
  }
}




var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldSceneAR;
