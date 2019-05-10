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

class SingleProduct extends Component {
    render() {
        const {product} = this.props.selectedItem
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
                            <Text>{product.Name}</Text>
                        </CardItem>
                        <CardItem cardBody>
                            {/* <Image source={{uri: 'IMAGE URL'}} /> */}
                            <Text>{product.Description}</Text>
                            <Text>{`Price: ${product.Price}`}</Text>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}

const mapState = state => {
    return {
        selectedItem: state.itemsReducer.selectedItem
    }
}

export default connect(mapState)(SingleProduct)
