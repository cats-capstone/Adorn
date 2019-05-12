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
  Picker,
  Form,
  Item,
} from 'native-base';
import {
  StyleSheet,
  Modal,
  TouchableHighlight,
  View,
  Alert,
} from 'react-native';
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
      singleView: false,
      modalVisible: false,
      category: 'All Furniture',
    };
  }

  componentDidMount() {
    this.props.fetchInitialItems();
  }

  onCategoryChange(value) {
    this.setState({
      category: value,
    });
  }

  openModal = () => this.setState({ modalVisible: true });
  closeModal = () => this.setState({ modalVisible: false });

  render() {
    console.log('THIS IS THE STATE', this.props.allItems);
    allItems = this.props.allItems;
    return (
      <Container>
        {this.state.singleView ? (
          <Container padder>
            <Header>
              <Left>
                <Button transparent>
                  <Icon
                    name="ios-arrow-back"
                    onPress={() => {
                      this.setState({ singleView: false });
                    }}
                  />
                </Button>
              </Left>
              <Body>
                <Title>{this.state.category}</Title>
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
                <Title>{this.state.category}</Title>
              </Body>
              <Right>
                <Button transparent>
                  <Icon name="ios-search" />
                </Button>
                <Button
                  transparent
                  onPress={() => {
                    this.openModal(true);
                  }}
                >
                  <Icon name="ios-menu" />
                </Button>
              </Right>
            </Header>
            <Content>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
              >
                <View style={localStyles.modalContainer}>
                  <Text style={localStyles.description}>
                    {[
                      'super fun text here, a list of items, such as settings, other stuff???',
                    ]}
                  </Text>
                  <Button primary onPress={this.closeModal}>
                    <Text>Cancel</Text>
                  </Button>
                </View>
              </Modal>
              <Form>
                <Item picker>
                  <Picker
                    renderHeader={backAction => (
                      <Header>
                        <Left>
                          <Button transparent onPress={backAction}>
                            <Icon name="ios-arrow-back" />
                          </Button>
                        </Left>
                        <Body style={{ flex: 3 }}>
                          <Title>Categories</Title>
                        </Body>
                        <Right />
                      </Header>
                    )}
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    placeholder="Select a Category"
                    placeholderStyle={{ color: '#bfc6ea' }}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.category}
                    onValueChange={this.onCategoryChange.bind(this)}
                  >
                    <Picker.Item label="All Furniture" value="All Furniture" />
                    <Picker.Item label="My Favorites" value="My Favorites" />
                    <Picker.Item label="Bedroom" value="Bedroom" />
                    <Picker.Item label="Chairs" value="Chairs" />
                    <Picker.Item label="Decoration" value="Decoration" />
                    <Picker.Item label="Desks" value="Desks" />
                    <Picker.Item label="Lighting" value="Lighting" />
                    <Picker.Item
                      label="Sofas & Armchairs"
                      value="Sofas & Armchairs"
                    />
                    <Picker.Item label="Tables" value="Tables" />
                    <Picker.Item
                      label="TV & Media Furniture"
                      value="TV & Media Furniture"
                    />
                  </Picker>
                </Item>
              </Form>
            </Content>
            {allItems.map(item => (
              <Card>
                <CardItem
                  key={item.id}
                  button
                  onPress={() => {
                    this.props.fetchOneItem(item.id);
                    this.setState({ singleView: true });
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

export default connect(
  mapState,
  mapDispatch
)(Products);

const localStyles = StyleSheet.create({
  icons: {
    fontSize: 25,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: '#C0C0C0',
    borderWidth: 2,
    marginHorizontal: 60,
    marginVertical: 120,
  },
  description: {
    padding: 20,
    fontSize: 18,
  },
});
