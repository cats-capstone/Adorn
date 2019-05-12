'use strict';

import React, { Component } from 'react';


import {
  Viro3DObject,
  ViroMaterials
} from 'react-viro';





export default class ObjsComponent extends Component {
  constructor() {
    super();
    this.state = {
      rotation: [0, 0, 0],
    };

    this._setRef = this._setRef.bind(this);
    this._onRotate = this._onRotate.bind(this);
  }
  componentDidMount() {
    this.setState({rotation: this.props.rotation})
  }
  render() {
    ViroMaterials.createMaterials({
      white: {
        lightingModel: "PBR",
        diffuseTexture: {uri: this.props.diffuse},
        // specularTexture: {uri: this.props.specular}
      }
    })
    return (
      <Viro3DObject
            source={{uri: this.props.source}}
            resources={[{uri: this.props.resources}]}
            materials="white"
            scale={this.props.size}
            type={this.props.type}


            ref={this._setRef}
            position={this.props.horizontal}
            
            
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



module.exports = ObjsComponent;
