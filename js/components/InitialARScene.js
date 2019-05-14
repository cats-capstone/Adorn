'use strict';

import React, { Component } from 'react';
import { ViroARScene, ViroAmbientLight } from 'react-viro';

import ARModels from './ARModels';

export default class InitialARScene extends Component {
  render() {
    return (
      <ViroARScene ref="arscene" anchorDetectionTypes="PlanesHorizontal">
        <ViroAmbientLight color="#FFFFFF" />
        <ARModels />
      </ViroARScene>
    );
  }
}

module.exports = InitialARScene;
