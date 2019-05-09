import React, { Component } from 'react';
import {
  Container,
  Content,
  Text,
  Card,
  Header,
  Body,
  Button,
  Title,
  CardItem,
  Icon,
  Image,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { fetchOneItem } from '../store/2Ditems'

class SingleProduct extends Component {
    componentDidMount() {
        //set the product on state
    }
    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Single Product Page</Title>
                    </Body>
                </Header>
                <Content>
                    <Card transparent>
                        <CardItem header>
                            <Text>THIS IS THE PRODUCT TITLE</Text>
                        </CardItem>
                        <CardItem cardBody>
                            {/* <Image source={{uri: 'IMAGE URL'}} /> */}
                            <Text>THIS IS THE PRODUCT DESCRIPTION</Text>
                            <Text>THIS IS THE PRODUCT PRICE</Text>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}

const mapState = state => {
    return {
        setProduct: (product) => dispatch(fetchOneItem(product))
    }
}

export default connect(mapState)(SingleProduct)
