import React, { Component } from 'react';
import {
    Container,
    Header,
    Content,
    Text,
    Button,
    View,
    Form,
    Item,
    Input,
    Label,
  } from 'native-base';

  import { StyleSheet } from 'react-native';

export default class Menu extends Component {
    render() {
        return (
            <Container>
                <Header>
                    <Text>
                        Menu
                    </Text>
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
