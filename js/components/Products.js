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
  Toast
} from 'native-base';
import { DrawerNavigator } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { fetchAllItems, fetchOneItem, fetchFavorites, addFavorite, setModel, setRender } from '../store/2Ditems';
import { database, auth } from '../../firebase'

class Products extends Component {
  constructor() {
    super();
    this.state = {
      popup: false
    };

    // this.favoriteItem = this.favoriteItem.bind(this)
    // this.isFavorite = this.isFavorite.bind(this)
    this.signOut = this.signOut.bind(this)
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

  render() {
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
                  </Button>
                  <Button transparent>
                    <Icon
                      name="ios-more"
                      style={localStyles.icons}
                      onPress={() => {
                        this.props.fetchOneItem(item.id);
                        this.setState({popup: true})
                      }}
                    />
                  </Button>
                </Body>
              </CardItem>
            </Card>
          ))}
          </Content>
          }
      </Container>
    );
  }
}
const mapState = state => {
  return {
    allItems: state.itemsReducers.allItems,
    selectedItem: state.itemsReducers.selectedItem,
    renderStatus: state.itemsReducers.hasRendered
  };
};

const mapDispatch = dispatch => {
  return {
    setModel: (product) => dispatch(setModel(product)),
    fetchInitialItems: () => dispatch(fetchAllItems()),
    fetchOneItem: productId => dispatch(fetchOneItem(productId)),
    setRender: status => dispatch(setRender(status)),
    fetchFavorites: () => dispatch(fetchFavorites()),
    addFavorite: productId => dispatch(addFavorite(productId))
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
