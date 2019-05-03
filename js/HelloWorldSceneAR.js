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
      worldCenterPosition: [0, 0, 0]
    };
    this._onAnchorFound = this._onAnchorFound.bind(this)
  }
  render() {
    return (
      <ViroARScene ref="arscene" 
                  anchorDetectionTypes="PlanesHorizontal" >
        <ViroAmbientLight color="#FFFFFF" />
          <ViroARPlane minHeight={.5} minWidth={.5} alignment={"Horizontal"} onAnchorFound={this._onAnchorFound}>
                
            <Viro3DObject source={require('./res/object_flowers/object_flowers.vrx')}
                          resources={[require('./res/object_flowers/object_flowers_diffuse.png'),
                                      require('./res/object_flowers/object_flowers_normal.png'),
                                      require('./res/object_flowers/object_flowers_specular.png')]}
                          position={[0, 0, 0]}
                          scale={[.5, .5, .5]}
                          type="VRX"
                          onDrag={()=>{}}
                          dragType="FixedToPlane"
                          dragPlane={{planePoint: this.state.worldCenterPosition, planeNormal: [0, 1, 0]}} />
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
