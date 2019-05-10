'use strict';

import React, { Component } from 'react';

import {
  ViroARScene,
  ViroARPlane,
  ViroAmbientLight,
} from 'react-viro';

import ObjComponent from './ObjComponent';
import {connect} from 'react-redux'

////////////////


////////////////
class ARModels extends Component {
  constructor() {
    super();
    this.state = {
      worldCenterPosition: [0, 0, 0],
      objs: [
    ]
    };

    this._setRef = this._setRef.bind(this);
    this._onAnchorFound = this._onAnchorFound.bind(this);
  }

  componentDidMount() {
    this.setState({objs: this.props.obgyn})
  }

  render() {
    console.log('RENDERING ARMODELS')
    console.log('PROPS: ', this.props.obgyn)
    console.log('OBJS ON STATE: ', this.state.objs)
    return (
        <ViroARPlane
          minHeight={0.5}
          minWidth={0.5}
          alignment={'Horizontal'}
          onAnchorFound={this._onAnchorFound}
        >
          {this.state.objs.map(obj => (
            <ObjComponent 
            horizontal={this.state.worldCenterPosition}
            source={obj.source}
            resources={obj.resources}
            materials={obj.materials}
            type={obj.type}
            size={obj.size}
            diffuse={obj.diffuse}
            specular={obj.specular}
            />
          ))}
        </ViroARPlane>
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

const mapState = (state) => {
  return {
    obgyn: state.itemsReducers.models
  }
}


module.exports = connect(mapState)(ARModels)






