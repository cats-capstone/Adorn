'use strict';

import React, { Component } from 'react';

import {
  ViroARScene,
  ViroARPlane,
  ViroAmbientLight,
} from 'react-viro';

import VrxComponent from './VrxComponent';
import ObjComponent from './ObjComponent';
import {connect} from 'react-redux'

////////////////


////////////////
class ARModels extends Component {
  constructor() {
    super();
    this.state = {
      worldCenterPosition: [0, 0, 0],
      vrxs: [
        { source: require('../res/car/object_car.obj'), 
        resources: [require('../res/car/object_car.mtl')], 
        materials: "white", 
        type:"OBJ",
        size: [0.5, 0.5, 0.5]
      },
      ],
      objs: [
    //     // { source: require('../res/car/object_car.obj'), 
    //     // resources: [require('../res/car/object_car.mtl')], 
    //     // materials: "white", 
    //     // type:"OBJ",
    //     // size: [0.5, 0.5, 0.5]},
        
    //   // {source: require('../res/CIMARR_N_Toilet/hsdc00.obj'), 
    //   // resources: [require('../res/CIMARR_N_Toilet/hsdc00.mtl')], 
    //   // materials: null, 
    //   // type: "OBJ",
    //   // size: [0.05, 0.05, 0.05]}
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
        {this.state.vrxs.map(vrx => (
            <VrxComponent
              horizontal={this.state.worldCenterPosition}
              source={vrx.source}
              resources={vrx.resources}
              type={vrx.type}
              size={vrx.size}
            />
          ))}
          {this.state.objs.map(obj => (
            <ObjComponent 
            horizontal={this.state.worldCenterPosition}
            source={obj.source}
            resources={obj.resources}
            materials={obj.materials}
            type={obj.type}
            size={obj.size}
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






