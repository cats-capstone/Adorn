'use strict';

import React, { Component } from 'react';


import {
  ViroARScene,
  ViroARPlane,
  ViroAmbientLight,
} from 'react-viro';

import ARModels from './ARModels'


////////////////


////////////////
export default class InitialARScene extends Component {
  constructor() {
    super();
    this.state = {
      worldCenterPosition: [0, 0, 0],
      vrxs: [
        { source: require('../res/object_flowers/object_flowers.vrx'), 
        resources: [
          require('../res/object_flowers/object_flowers_diffuse.png'),
          require('../res/object_flowers/object_flowers_normal.png'),
          require('../res/object_flowers/object_flowers_specular.png'),
        ], 
        type: 'VRX', 
        size: [0.5, 0.5, 0.5]
      },
      ],
      objs: []
    };

    this._setRef = this._setRef.bind(this);
    this._onAnchorFound = this._onAnchorFound.bind(this);
  }
  render() {
    return (
      <ViroARScene ref="arscene" anchorDetectionTypes="PlanesHorizontal">
        <ViroAmbientLight color="#FFFFFF" />
          <ARModels />
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


module.exports = InitialARScene;
