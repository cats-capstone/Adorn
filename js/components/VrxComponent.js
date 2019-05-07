'use strict';

import React, { Component } from 'react';


import {

  Viro3DObject,

} from 'react-viro';


export default class VrxComponent extends Component {
  constructor() {
    super();
    this.state = {
      rotation: [0, 0, 0],
    };

    this._setRef = this._setRef.bind(this);
    this._onRotate = this._onRotate.bind(this);
  }
  render() {
    return (
      <Viro3DObject
            source={this.props.source}
            resources={this.props.resources}
            ref={this._setRef}
            position={this.props.horizontal}
            scale={this.props.size}
            type={this.props.type}
            onDrag={() => {}}
            dragType="FixedToPlane"
            dragPlane={{
              planePoint: this.props.horizontal,
              planeNormal: [0, 1, 0],
            }}
            rotation={this.state.rotation}
            onRotate={this._onRotate}
          />
    );
  }

  _onRotate(rotateState, rotationFactor, source) {
    if (rotateState === 3) {
      this.setState({
        rotation: [
          this.state.rotation[0],
          this.state.rotation[1] + rotationFactor,
          this.state.rotation[2],
        ],
      });
      return;
    }

    this.arRef.setNativeProps({
      rotation: [
        this.state.rotation[0],
        this.state.rotation[1] + rotationFactor,
        this.state.rotation[2],
      ],
    });
  }

  _setRef(component) {
    this.arRef = component;
  }
}


module.exports = VrxComponent;
