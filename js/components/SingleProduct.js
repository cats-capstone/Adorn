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
import { fetchAllItems, fetchOneItem, setModel } from '../store/2Ditems';

class SingleProduct extends Component {
  render() {
    const product = this.props.selectedItem;
    console.log(product)
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
              {/* <Image source={{ uri: product.ImageUrl }} /> */}
              <Text>{product.Description}</Text>
              <Text>{`Price: ${product.Price}`}</Text>
            </CardItem>
            <Button block
              onPress={() => {
                this.props.setModel({source: product.Source, 
                                    resources: product.Resources,
                                    size: product.Scale,
                                    type: product.Type,
                                    materials: "white",
                                    diffuse: product.DiffuseTextureUrl,
                                    specular: product.SpecularTextureUrl})
                Actions.DisplayAR();
              }}>
              <Text>TRY IN YOUR ROOM</Text>
            </Button>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapState = state => {
  return {
    selectedItem: state.itemsReducers.selectedItem,
  };
};

const mapDispatch = dispatch => {
  return {
    setModel: (product) => dispatch(setModel(product)),
    fetchInitialItems: () => dispatch(fetchAllItems()),
    fetchOneItem: productId => dispatch(fetchOneItem(productId)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
