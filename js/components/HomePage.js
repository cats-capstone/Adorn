import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  View,
  Form,
  Item,
  Input,
  Label,
} from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class HomePage extends Component {
  render() {
    return (
      <Container>
        <Content>
          <View style={localStyles.content}>
            <Form>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input />
              </Item>
              <Item floatingLabel last>
                <Label>Password</Label>
                <Input />
              </Item>
            </Form>
            <Button block style={localStyles.buttons}>
              <Text>Sign In</Text>
            </Button>
            <Button
              block
              style={localStyles.buttons}
              onPress={() => {
                Actions.Products();
              }}
            >
              <Text>Continue as Guest</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  buttons: {
    margin: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
});
