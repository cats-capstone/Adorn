import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Content,
  Header,
  Body,
  Title,
  Text,
  Button,
  Left,
  Icon,
  View,
  Item,
} from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { database, auth } from '../../firebase'

export default class FavoriteItem extends Component {
    constructor() {
        super()
        this.state = {
            product: {}
        }
    }
    componentDidMount() {
        database.ref(`/furniture/${this.props.productId}`).once('value')
        .then(snapshot => {
          const productInfo = snapshot.val()
          console.log('PRODUCTINFO: ', productInfo)
          this.setState({product: productInfo})
        });
    }
    render() {
        return (
            <Text>{this.state.product.Name}</Text>
        )
    }
}

