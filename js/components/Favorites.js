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
  Form,
  Item,
  Input,
  Label,
} from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { database, auth } from '../../firebase'
import FavoriteProduct from './FavoriteProduct'

class Favorites extends Component {
    render() {
        console.log('FAVORITES FROM THE STORE!!!', this.props.allFavorites)
        return (
            <Container>
                <Header>
                <Left>
                    <Button transparent>
                        <Icon
                            name="ios-arrow-back"
                            onPress={() => {
                                Actions.pop();
                            }}
                        />
                    </Button>
                </Left>
                    <Body>
                        <Title>Favorites</Title>
                    </Body>
                </Header>
                <Content>
                    {
                        this.props.allFavorites.length ? this.props.allFavorites.map(item => {
                            return <FavoriteProduct key={item} productId={item} />
                        }) : <Text>You have no favorites yet!</Text>
                    }
                    {
                        !auth.currentUser && <Text>Log in to add to your favorites!</Text>
                    }
                </Content>
            </Container>
        )
    }
}

const mapState = state => {
    return {
        allFavorites: state.itemsReducers.favorites
    }
}

export default connect(mapState)(Favorites)
