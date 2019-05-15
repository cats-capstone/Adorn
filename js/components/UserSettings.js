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

export default class UserSettings extends Component {
    render() {
        return (
            <Container>
                <Header>
                    <Text>
                        Account Settings
                    </Text>
                </Header>
            </Container>
        )
    }
}