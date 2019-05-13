import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Header,
  Body,
  Title,
  Text,
  Button,
  Right,
  Icon,
  View,
  Item,
} from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { database, auth } from '../../firebase'
import { deleteFavorite, fetchFavorites } from '../store/2Ditems'

class FavoriteItem extends Component {
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
          this.setState({product: productInfo})
        });
    }
    render() {
        const {product} = this.state
        console.log('props in favoriteProduct: ', this.props)
        return (
            <Container>
                <Content>
                <Card
                // style={localStyles.cardLayout}
                >
                    <CardItem header>
                        <Text>{product.Name}</Text>
                        <Button
                            block
                            onPress={() => {
                                this.props.removeFavorite(this.props.productId)
                                // this.props.fetchFavorites()
                            }}>
                            <Text>Delete from favorites</Text>
                        </Button>
                    </CardItem>
                    <CardItem
                        cardBody
                        style={localStyles.cardBody} >
                        <Text>{product.Description}</Text>
                        <Text>{`$${product.Price}`}</Text>
                    </CardItem>
                    
                </Card>
                </Content>
            </Container>
        )
    }
}

const mapDispatch = dispatch => {
    return {
        removeFavorite: productId => dispatch(deleteFavorite(productId)),
        fetchFavorites: () => dispatch(fetchFavorites()),
    }
}

const localStyles = StyleSheet.create({
    // cardLayout: {
    //     height: 10,
    // },
    cardBody: {
        flex: 1
    }
})

export default connect(null, mapDispatch)(FavoriteItem)
