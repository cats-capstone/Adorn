'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARPlane,
  ViroARPlaneSelector,
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
      worldCenterPosition: [0, 0, 0]
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onLoadEnd = this._onLoadEnd.bind(this)
    this._onLoadStart = this._onLoadStart.bind(this)
    this._onDrag = this._onDrag.bind(this)
    this._onAnchorFound = this._onAnchorFound.bind(this)
  }

  render() {
    console.log('IN RENDER!')
    return (
      <ViroARScene ref="arscene" 
                  onTrackingUpdated={this._onInitialized} 
                  anchorDetectionTypes="PlanesHorizontal" 
                  // dragType="FixedToPlane"
                  // dragPlane={{planePoint: [0, 0, 0,], planeNormal: [0, 1, 0]}}
                   >
        <ViroAmbientLight color="#FFFFFF" />
          <ViroARPlane minHeight={.5} minWidth={.5} alignment={"Horizontal"} onAnchorFound={this._onAnchorFound}>
                
            <Viro3DObject source={require('./res/object_flowers/object_flowers.vrx')}
                          resources={[require('./res/object_flowers/object_flowers_diffuse.png'),
                                      require('./res/object_flowers/object_flowers_normal.png'),
                                      require('./res/object_flowers/object_flowers_specular.png')]}
                          position={[0, 0, 0]}
                          scale={[.5, .5, .5]}
                          type="VRX"
                          onDrag={this._onDrag}
                          dragType="FixedToPlane"
                            dragPlane={{planePoint: this.state.worldCenterPosition, planeNormal: [0, 1, 0]}}
          />
          </ViroARPlane>

      </ViroARScene>
    );
  }
  _onAnchorFound(anchorMap) {
    if (anchorMap.type != "plane") {
      return;
    }
    var worldCenterPosition = anchorMap.position
    this.setState({worldCenterPosition})
  }

  _onInitialized(state, reason) {
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

  _onDrag() {
    console.log('DRAGGING OBJ!')
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
