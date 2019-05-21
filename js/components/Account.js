import React, { Component } from 'react';
import {
  Container,
  Header,
  Left,
  Right,
  Content,
  Text,
  Button,
  Icon,
  Title,
  Body,
} from 'native-base';

import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { auth } from '../../firebase';

export default class Account extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            {auth.currentUser ? (
              <Title>Account Info</Title>
            ) : (
              <Title>No user signed in!</Title>
            )}
          </Body>
          <Right />
        </Header>
        {auth.currentUser ? (
          <Content>
            <Text style={{ margin: '10%' }}>
              {`Email: ${auth.currentUser.email}`}
            </Text>
            <Button style={localStyles.buttons}>
              <Text>Change Email</Text>
            </Button>
            <Button style={localStyles.buttons}>
              <Text>Change Password</Text>
            </Button>
          </Content>
        ) : (
          <Content>
            <Text>No account?</Text>
            <Button
              style={localStyles.buttons}
              onPress={() => Actions.HomePage()}
            >
              <Text>Sign up now!</Text>
            </Button>
          </Content>
        )}
      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  buttons: {
    margin: '10%',
    backgroundColor: '#8754B4',
  },
});
