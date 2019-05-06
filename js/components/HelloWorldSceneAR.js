'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARPlane,
  ViroARPlaneSelector,
  ViroBox,
  Viro3DObject,
  ViroAmbientLight,
  ViroNode,
} from 'react-viro';

import ObjComponent from './objComponent'

import { Actions } from 'react-native-router-flux';

////////////////
let flowerSource = require('./res/object_flowers/object_flowers.vrx')
let flowerResources = [
  require('./res/object_flowers/object_flowers_diffuse.png'),
  require('./res/object_flowers/object_flowers_normal.png'),
  require('./res/object_flowers/object_flowers_specular.png'),
]

let chairSource = require('./res/Eames-chair-DSW.obj')
let chairResources = [
  require('./res/teak_B.jpg'),
  require('./res/teak_D.jpg'),
  require('./res/teak_R.jpg'),
]
////////////////
export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();
    this.state = {
      worldCenterPosition: [0, 0, 0],
      objs : [{source: flowerSource,
              resources: flowerResources,
              type: "VRX"},
            {source: flowerSource,
            resources: flowerResources,
          type: "VRX"}]
    };

    this._setRef = this._setRef.bind(this);
    this._onAnchorFound = this._onAnchorFound.bind(this);
  }
  render() {
    return (
      <ViroARScene ref="arscene" anchorDetectionTypes="PlanesHorizontal">
        <ViroAmbientLight color="#FFFFFF" />
        <ViroARPlane
          minHeight={0.5}
          minWidth={0.5}
          alignment={'Horizontal'}
          onAnchorFound={this._onAnchorFound}
        >
<<<<<<< HEAD:js/components/HelloWorldSceneAR.js
          <Viro3DObject
            source={require('../res/object_flowers/object_flowers.vrx')}
            resources={[
              require('../res/object_flowers/object_flowers_diffuse.png'),
              require('../res/object_flowers/object_flowers_normal.png'),
              require('../res/object_flowers/object_flowers_specular.png'),
            ]}
            ref={this._setRef}
            position={[0, 0, 0]}
            scale={[0.5, 0.5, 0.5]}
            type="VRX"
            onDrag={() => {}}
            dragType="FixedToPlane"
            dragPlane={{
              planePoint: this.state.worldCenterPosition,
              planeNormal: [0, 1, 0],
            }}
            rotation={this.state.rotation}
            onRotate={this._onRotate}
          />
=======
        {this.state.objs.map(obj=>(<ObjComponent horizontal={this.state.worldCenterPosition} 
                                                  source={obj.source}
                                                  resources={obj.resources}
                                                  type={obj.type}/>))}
         
>>>>>>> master:js/HelloWorldSceneAR.js
        </ViroARPlane>
      </ViroARScene>
    );
  }
  _onAnchorFound(anchorMap) {
    if (anchorMap.type != 'plane') {
      return;
    }
    var worldCenterPosition = anchorMap.position;
    this.setState({ worldCenterPosition });
  }


  _setRef(component) {
    this.arRef = component;
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
