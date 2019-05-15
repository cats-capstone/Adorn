'use strict';

import React, { Component } from 'react';
import {
  ViroARScene,
  ViroAmbientLight,
  ViroARPlaneSelector,
  ViroARCamera,
  ViroText,
} from 'react-viro';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';

import { setRender } from '../store/2Ditems';
import ObjsComponent from './ObjsComponent';

export class InitialARScene extends Component {
  constructor() {
    super();
    this.state = {
      worldCenterPosition: [0, 0, 0],
      showMessage: true,
    };

    this.onPlaneSelected = this.onPlaneSelected.bind(this);
  }

  componentDidMount() {
    this.props.setRender(true);
  }

  onPlaneSelected(anchorMap) {
    const worldCenterPosition = anchorMap.position;
    this.setState({ worldCenterPosition, showMessage: false });
  }

  render() {
    return (
      <ViroARScene ref="arscene" anchorDetectionTypes="PlanesHorizontal">
        <ViroARCamera>
          <ViroText
            text="Aim the camera at the floor and tap to select"
            scale={[0.5, 0.5, 0.5]}
            position={[0, -0.1, -1]}
            extrusionDepth={1}
            style={localStyles.message}
            visible={this.state.showMessage}
          />
        </ViroARCamera>
        <ViroAmbientLight color="#FFFFFF" />
        <ViroARPlaneSelector
          minHeight={0.5}
          minWidth={0.5}
          onPlaneSelected={this.onPlaneSelected}
        >
          {this.props.objects.map(obj => (
            <ObjsComponent key={obj.id}
              horizontal={this.state.worldCenterPosition}
              source={obj.source}
              resources={obj.resources}
              materials={obj.materials}
              type={obj.type}
              size={obj.size}
              diffuse={obj.diffuse}
              specular={obj.specular}
              rotation={obj.rotation}
            />
          ))}
        </ViroARPlaneSelector>
      </ViroARScene>
    );
  }
}

const mapState = state => {
  return {
    objects: state.itemsReducers.models,
    renderStatus: state.itemsReducers.hasRendered,
  };
};
const mapDispatch = dispatch => {
  return {
    setRender: status => dispatch(setRender(status)),
  };
};

const localStyles = StyleSheet.create({
  message: {
    fontFamily: 'arial',
    fontSize: 12,
  },
});

module.exports = connect(
  mapState,
  mapDispatch
)(InitialARScene);
