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
  Left,
  Right,
  Image,
} from 'native-base';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { fetchAllItems, fetchOneItem } from '../store/2Ditems';

class Products extends Component {
  componentDidMount() {
    this.props.fetchInitialItems();
  }

  render() {
    console.log('THIS IS THE STATE', this.props.allItems);
    allItems = this.props.allItems;
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
            <Title>Furniture</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="ios-menu" />
            </Button>
          </Right>
        </Header>
        <Content padder>
          {allItems.map(item => (
            <Card>
              <CardItem key={item.id}>
                <Body>
                  {/* <Image>{item.ImageUrl}</Image> */}
                  <Text>{item.Name}</Text>
                  <Text>${item.Price}</Text>
                  <Button transparent>
                    <Icon name="ios-heart-empty" style={localStyles.icons} />
                  </Button>
                  <Button transparent>
                    <Icon name="ios-more" style={localStyles.icons} />
                  </Button>
                </Body>
              </CardItem>
            </Card>
          ))}
        </Content>
      </Container>
    );
  }
}
const mapState = state => {
  return {
    allItems: state.itemsReducers.allItems,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchInitialItems: () => dispatch(fetchAllItems()),
    fetchOneItem: (productId) => dispatch(fetchOneItem(productId))
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked when the url changes
export default connect(
  mapState,
  mapDispatch
)(Products);

const localStyles = StyleSheet.create({
  icons: {
    fontSize: 25,
  },
});
