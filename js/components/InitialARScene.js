'use strict';

import React, { Component } from 'react';
import { ViroARScene, ViroAmbientLight } from 'react-viro';
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

    this._setRef = this._setRef.bind(this);
    this.onPlaneSelected = this.onPlaneSelected.bind(this);
  }

  componentDidMount() {
    this.props.setRender(true);
  }

  onPlaneSelected(anchorMap) {
    const worldCenterPosition = anchorMap.position;
    this.setState({ worldCenterPosition, showMessage: false });
  }

  _setRef(component) {
    this.arRef = component;
  }

  render() {
    return (
      <ViroARScene ref="arscene" anchorDetectionTypes="PlanesHorizontal">
        <ViroAmbientLight color="#FFFFFF" />

        {this.props.objects.map(obj => (
          <ObjsComponent
            key={obj.id}
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
