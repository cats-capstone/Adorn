import React, { Component } from 'react';
import {
  ListItem,
  Left,
  Right,
  Text,
  Button,
  Icon,
  Body,
  View,
} from 'native-base';

import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { auth } from '../../firebase';

export default class Menu extends Component {
  render() {
    return (
      <View style={localStyles.modalContainer}>
        {auth.currentUser ? (
          <View style={localStyles.viewContainer}>
            <Text
              style={{
                fontSize: 20,
                padding: 5,
                fontWeight: 'bold',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Welcome {auth.currentUser.email}!
            </Text>
            <ListItem onPress={() => this.props.close()}>
              <Left>
                <Button style={localStyles.iconButtons}>
                  <Icon active name="images" style={localStyles.icons} />
                </Button>
              </Left>
              <Body>
                <Text>View Saved Rooms</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>

            <ListItem onPress={() => this.props.close()}>
              <Left>
                <Button style={localStyles.iconButtons}>
                  <Icon active name="mail" style={localStyles.icons} />
                </Button>
              </Left>
              <Body>
                <Text>Change Email</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>

            <ListItem onPress={() => this.props.close()}>
              <Left>
                <Button style={localStyles.iconButtons}>
                  <Icon active name="key" style={localStyles.icons} />
                </Button>
              </Left>
              <Body>
                <Text>Change Password</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </View>
        ) : (
          <View style={localStyles.viewContainer}>
            <Text
              style={{
                fontSize: 20,
                padding: 5,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              You're not signed in!
            </Text>
            <Text
              style={{ fontSize: 14, marginLeft: 'auto', marginRight: 'auto' }}
            >
              Don't have an account?
            </Text>
            <Button
              style={localStyles.signUpButton}
              onPress={() => {
                this.props.close();
                Actions.HomePage();
              }}
            >
              <Text>Sign up now</Text>
            </Button>
          </View>
        )}
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: '#C0C0C0',
    borderWidth: 2,
    marginHorizontal: '5%',
    marginVertical: 180,
  },
  iconButtons: {
    backgroundColor: '#8754B4',
  },
  viewContainer: {
    marginHorizontal: 'auto',
    marginVertical: 'auto',
  },
  icons: {
    color: 'white',
  },
  signUpButton: {
    backgroundColor: '#8754B4',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    marginVertical: 10,
  },
});
