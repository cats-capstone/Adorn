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
import { connect } from 'react-redux';
import { fetchAllItems } from '../store/2Ditems';

class Products extends Component {
  componentDidMount() {
    this.props.fetchInitialItems();
    console.log('COMPONENT DID MOUNT')
  }

  render() {
    console.log('THIS IS THE STATE', this.props.allItems)
    return (
      <Container>
        <Header>
          <Button transparent>
            <Icon
              name="ios-arrow-back"
              onPress={() => {
                Actions.pop();
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
          <Card>
            <CardItem>
              <Body>
                <Text>
                  Do you like me? Click the icon to add me to your room.
                </Text>
                <Button transparent>
                  <Icon name="ios-add-circle-outline" />
                </Button>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
const mapState = state => {
  return {
    allItems: state.itemsReducers.allItems
  }
}

const mapDispatch = dispatch => {
  return {
    fetchInitialItems: () => dispatch(fetchAllItems()),
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked when the url changes
export default connect(
  mapState,
  mapDispatch
)(Products);
