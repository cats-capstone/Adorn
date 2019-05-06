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

export default class HomePage extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Home Page</Title>
          </Body>
          <Button transparent>
            <Icon
              name="ios-menu"
              onPress={() => {
                Actions.Products();
              }}
            />
          </Button>
        </Header>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Text>
                  This is the Home Page, Press button to go to to the AR stuff
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Button
            dark
            bordered
            style={{ alignSelf: 'center', margin: 30 }}
            onPress={() => {
              Actions.DisplayAR();
            }}
          >
            <Text>Go to AR</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
