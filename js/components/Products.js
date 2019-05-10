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
import { DrawerNavigator } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  fetchAllItems,
  fetchOneItem,
  setModel,
  setRender,
} from '../store/2Ditems';

class Products extends Component {
  constructor() {
    super();
    this.state = {
      popup: false,
    };
  }

  componentDidMount() {
    this.props.fetchInitialItems();
  }

  render() {
    console.log('THIS IS THE STATE', this.props.allItems);
    allItems = this.props.allItems;
    return (
      <Container>
        {this.state.popup ? (
          <Container padder>
            <Header>
              <Left>
                <Button transparent>
                  <Icon
                    name="ios-arrow-back"
                    onPress={() => {
                      this.setState({ popup: false });
                    }}
                  />
                </Button>
              </Left>
              <Body>
                <Title>All Furniture</Title>
              </Body>
              <Right />
            </Header>
            <Content>
              <Card transparent>
                <CardItem header>
                  <Text>{this.props.selectedItem.Name}</Text>
                </CardItem>
                <CardItem cardBody>
                  {/* <Image source={{ uri: product.ImageUrl }} /> */}
                  <Text>{this.props.selectedItem.Description}</Text>
                  <Text>{`Price: ${this.props.selectedItem.Price}`}</Text>
                </CardItem>
                <Button
                  block
                  onPress={() => {
                    this.props.setModel({
                      source: this.props.selectedItem.Source,
                      resources: this.props.selectedItem.Resources,
                      size: this.props.selectedItem.Scale,
                      type: this.props.selectedItem.Type,
                      materials: 'white',
                      diffuse: this.props.selectedItem.DiffuseTextureUrl,
                      specular: this.props.selectedItem.SpecularTextureUrl,
                    });
                    if (this.props.renderStatus) {
                      Actions.pop();
                    } else {
                      Actions.DisplayAR();
                    }
                  }}
                >
                  <Text>TRY IN YOUR ROOM</Text>
                </Button>
              </Card>
            </Content>
          </Container>
        ) : (
          <Container padder>
            <Header>
              <Left>
                <Button transparent>
                  <Icon name="ios-person" />
                </Button>
              </Left>
              <Body>
                <Title>All Furniture</Title>
              </Body>
              <Right>
                <Button transparent>
                  <Icon name="ios-search" />
                </Button>
                <Button transparent>
                  <Icon name="ios-menu" />
                </Button>
              </Right>
            </Header>
            {allItems.map(item => (
              <Card>
                <CardItem
                  key={item.id}
                  button
                  onPress={() => {
                    this.props.fetchOneItem(item.id);
                    this.setState({ popup: true });
                  }}
                >
                  <Body>
                    {/* <Image>{item.ImageUrl}</Image> */}
                    <Text>{item.Name}</Text>
                    <Text>${item.Price}</Text>
                    <Button transparent>
                      <Icon name="ios-heart-empty" style={localStyles.icons} />
                    </Button>
                  </Body>
                </CardItem>
              </Card>
            ))}
          </Container>
        )}
      </Container>
    );
  }
}
const mapState = state => {
  return {
    allItems: state.itemsReducers.allItems,
    selectedItem: state.itemsReducers.selectedItem,
    renderStatus: state.itemsReducers.hasRendered,
  };
};

const mapDispatch = dispatch => {
  return {
    setModel: product => dispatch(setModel(product)),
    fetchInitialItems: () => dispatch(fetchAllItems()),
    fetchOneItem: productId => dispatch(fetchOneItem(productId)),
    setRender: status => dispatch(setRender(status)),
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
