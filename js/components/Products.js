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
import {database} from '../../firebase'

export default class Products extends Component {
  // constructor() {
  //   super()

  //   this.buildObj = this.buildObj.bind(this)
  // }

  // buildObj() {

  // }

  componentDidMount() {
    database.ref('/furniture')
      .once('value')
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          console.log('FIREBASE VALUE!!', childSnapshot.val())
        })
    })
  }

  render() {
    return (
      <Container>
        <Header>
          <Button transparent>
            <Icon
              name="ios-arrow-back"
              onPress={() => {
                Actions.HomePage();
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
