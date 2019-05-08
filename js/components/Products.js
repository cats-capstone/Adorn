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
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux'
const dummyProducts = [
  {name: "chair"},
  {name: "flowerpot"},
  {name: "couch"},
]

class Products extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Button transparent>
            <Icon
              name="ios-arrow-back"
              onPress={() => {
                Actions.pop()
              }}
            />
          </Button>
          <Body>
            <Title>Furniture</Title>
          </Body>
          <Button transparent>
            <Icon name="ios-menu" />
          </Button>
        </Header>
        <Content padder>
            {
              this.state.products.map((product) => {
                return (
                <Card>
                  <CardItem>
                    <Body>
                      <Text>
                        {product.name}
                      </Text>
                      <Text>
                        Do you like me? Click the icon to add me to your room.
                      </Text>
                      <Button transparent>
                          <Icon name="ios-add-circle-outline" />
                      </Button>
                    </Body>
                    </CardItem>
                </Card>
                )
              })
            }
        </Content>
      </Container>
    );
  }
}




const mapStateToProps = state => {
  return {
    products: state.itemsReducer.allItems 
  }
}


export default connect(mapStateToProps, null)(Products)

