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
<<<<<<< HEAD
  Toast
=======
  Picker,
  Form,
  Item,
>>>>>>> master
} from 'native-base';
import { StyleSheet, Modal, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
<<<<<<< HEAD
import { fetchAllItems, fetchOneItem, fetchFavorites, addFavorite, setModel, setRender } from '../store/2Ditems';
import { database, auth } from '../../firebase'
=======
import { SearchBar } from 'react-native-elements';

import {
  fetchAllItems,
  fetchOneItem,
  setModel,
  setRender,
} from '../store/2Ditems';
>>>>>>> master

class Products extends Component {
  constructor() {
    super();
    this.state = {
<<<<<<< HEAD
      popup: false
    };

    // this.favoriteItem = this.favoriteItem.bind(this)
    // this.isFavorite = this.isFavorite.bind(this)
    this.signOut = this.signOut.bind(this)
=======
      singleView: false,
      modalVisible: false,
      category: 'All Furniture',
      search: '',
    };

    // this.updateSearch = this.updateSearch.bind(this);
>>>>>>> master
  }

  componentDidMount() {
    this.props.fetchInitialItems();
    this.props.fetchFavorites()
    // const user = auth.currentUser
    // if (user) {
    //   const userRef = database.ref(`/users/${user.uid}`).child('favorites')
    //   userRef.once('value').then(function(snapshot) {
    //     console.log('snapshot.val!!', snapshot.val())
    //     let allFavs = []
    //     snapshot.forEach(function(favorite) {
    //       console.log('favorite.key!', favorite.key)
    //       allFavs.push(favorite.key)
    //     })
    //     this.setState({favorites: allFavs})
    //   })
    // }
  }

  // favoriteItem(itemId) {
  //   const user = auth.currentUser
  //   if (user) {
  //     const userRef = database.ref(`/users/${user.uid}`).child('favorites')
  //     userRef.update({[itemId]: true})
  //   } else {
  //     Toast.show({
  //       text: 'Sign in to add to your favorites!'
  //     })
  //   } 
  // }

  // isFavorite(itemId) {
  //   const user = auth.currentUser
  //   if (user) {
  //     const userRef = database.ref(`/users/${user.uid}`).child('favorites')
  //     userRef.once('value')
  //     .then(function(snapshot) {
  //       console.log('snapshot.val(): ', snapshot.val())
  //       return snapshot.hasChild(itemId)
  //     })
  //   }
  // }

  signOut() {
    auth.signOut()
    .then(function() {
      Actions.HomePage()
      console.log('SIGN OUT SUCCESSFUL')
    })
    .catch(function(error) {
      console.log('ERROR SIGNING OUT: ', error)
    })
  }

  onCategoryChange(value) {
    this.setState({
      category: value,
    });
  }

  updateSearch(text) {
    this.setState({
      search: text,
    });
  }

  openModal = () => this.setState({ modalVisible: true });
  closeModal = () => this.setState({ modalVisible: false });

  render() {
<<<<<<< HEAD
    const allItems = this.props.allItems;
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
              <Icon name="ios-search" />
            </Button>
            <Button transparent onPress={() => Actions.Favorites()}>
              <Icon name="ios-heart" />
            </Button>
            <Button transparent>
              <Icon name="ios-menu" />
            </Button>
          </Right>
        </Header>
        
        {this.state.popup ?
        <Container padder>
        <Header>
          <Body>
            <Title>Single Product Page</Title>
          </Body>
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
            <Button block
              onPress={() => {
                this.props.setModel({source: this.props.selectedItem.Source, 
                                    resources: this.props.selectedItem.Resources,
                                    size: this.props.selectedItem.Scale,
                                    type: this.props.selectedItem.Type,
                                    materials: "white",
                                    diffuse: this.props.selectedItem.DiffuseTextureUrl,
                                    specular: this.props.selectedItem.SpecularTextureUrl})
                if (this.props.renderStatus){
                  Actions.pop()
                }
                else {
                  Actions.DisplayAR();
                }        
              }}>
              <Text>TRY IN YOUR ROOM</Text>
            </Button>
            <Button onPress={() => {this.setState({popup: false})}}>
              <Text>Back to All Products</Text>
            </Button>
          </Card>
        </Content>
        </Container>
          :
          <Content padder>  
            <Button transparent
                    onPress={this.signOut}>
              <Text>
                Sign Out
              </Text>
            </Button>
          {allItems.map(item => (
            <Card key={item.id}>
              <CardItem>
                <Body>
                  {/* <Image>{item.ImageUrl}</Image> */}
                  <Text>{item.Name}</Text>
                  <Text>${item.Price}</Text>
                  <Button transparent
                  onPress={() => {
                    this.props.addFavorite(item.id)
                    // this.props.fetchFavorites()
                  }}>
                    {/* <Icon name={this.isFavorite(item.id) ? 'heart' : 'ios-heart-empty'} style={localStyles.icons} /> */}
                        <Icon name='heart' style={localStyles.icons} />
=======
    console.log('THIS IS THE STATE', this.props.allItems);
    const { search } = this.state;
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
                      rotation: this.props.selectedItem.Rotation,
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
                <Button transparent onPress={this.openModal}>
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
                  <Text>text inside modal</Text>
                  <Button onPress={this.closeModal}>
                    <Text>Close</Text>
>>>>>>> master
                  </Button>
                </View>
              </Modal>
              <SearchBar
                round
                placeholder="I'm looking for..."
                containerStyle={localStyles.searchBar}
                inputStyle={localStyles.searchInput}
                lightTheme={true}
                searchIcon={{ size: 24 }}
                onChangeText={text => this.updateSearch(text)}
                value={search}
                onClear={text => this.updateSearch('')}
              />
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
<<<<<<< HEAD
                  </Button>
                </Body>
              </CardItem>
            </Card>
          ))}
          </Content>
          }
=======
                    <Picker.Item label="Tables" value="Tables" />
                    <Picker.Item
                      label="TV & Media Furniture"
                      value="TV & Media Furniture"
                    />
                  </Picker>
                </Item>
              </Form>

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
                        <Icon
                          name="ios-heart-empty"
                          style={localStyles.icons}
                        />
                      </Button>
                    </Body>
                  </CardItem>
                </Card>
              ))}
            </Content>
          </Container>
        )}
>>>>>>> master
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
<<<<<<< HEAD
    fetchFavorites: () => dispatch(fetchFavorites()),
    addFavorite: productId => dispatch(addFavorite(productId))
=======
>>>>>>> master
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
  searchBar: {
    backgroundColor: 'white',
  },
  searchInput: {
    color: 'black',
  },
});
