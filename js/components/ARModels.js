'use strict';

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { ViroARPlane, ViroText, ViroARPlaneSelector } from 'react-viro';

import ObjsComponent from './ObjsComponent';
import { connect } from 'react-redux';
import { setRender } from '../store/2Ditems';

class ARModels extends Component {
  constructor() {
    super();
    this.state = {
      worldCenterPosition: [0, 0, 0],
    };

    this._setRef = this._setRef.bind(this);
    this.onPlaneSelected = this.onPlaneSelected.bind(this);
  }

  componentDidMount() {
    this.props.setRender(true);
  }

  render() {
    return (
      <ViroARPlaneSelector
        minHeight={0.5}
        minWidth={0.5}
        onPlaneSelected={this.onPlaneSelected}
      >
        {this.props.objects.map(obj => (
          <ObjsComponent
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
    );
  }

  onPlaneSelected(anchorMap) {
    const worldCenterPosition = anchorMap.position;
    this.setState({ worldCenterPosition });
  }

  _setRef(component) {
    this.arRef = component;
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

module.exports = connect(
  mapState,
  mapDispatch
)(ARModels);
