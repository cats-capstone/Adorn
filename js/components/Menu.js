import React, { Component } from 'react';
import {
    Container,
    Header,
    Left,
    Content,
    Text,
    Button,
    Icon,
    Title,
    Body,
    View,
    Item,
  } from 'native-base';

  import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Menu extends Component {
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => {
                                Actions.pop()
                            }}>
                            <Icon name="ios-arrow-back"></Icon>
                        </Button>
                    </Left>
                    <Body style={{flex: 1}}>
                        <Title>Menu</Title>
                    </Body>
                </Header>
                <Content>
                        <Button style={localStyles.buttons}>
                            <Text>Account</Text>
                        </Button>
                        <Button style={localStyles.buttons}>
                            <Text>Saved Rooms</Text>
                        </Button>
                        <Button style={localStyles.buttons}>
                            <Text>Settings</Text>
                        </Button>
                </Content>
            </Container>
        )
    }
}

const localStyles = StyleSheet.create({
    buttons: {
        margin: '10%',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})
