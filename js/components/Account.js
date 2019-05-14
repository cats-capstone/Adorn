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
    View,
    Item,
  } from 'native-base';

import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { auth } from '../../firebase'

export default class Account extends Component {
    render() {
        return (
           auth.currentUser ?
                <Container>
                    <Header>
                        <Left>
                            <Button
                                transparent
                                onPress={() => Actions.pop()}>
                                <Icon name="ios-arrow-back" />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Account Info</Title>
                        </Body>
                        <Right />
                    </Header>
                    <Content>
                        <Text style={{margin: '10%'}}>
                            {`Email: ${auth.currentUser.email}`}
                        </Text>
                        <Button style={localStyles.buttons}>
                            <Text>Change Email</Text>
                        </Button>
                        <Button style={localStyles.buttons}>
                            <Text>Change Password</Text>
                        </Button>
                    </Content>
                </Container>
                :
                <Container>
                    <Header>
                        <Title>
                            No user logged in!
                        </Title>
                    </Header>
                    <Content>
                        <Text>
                            No account? Sign up here!
                        </Text>
                    </Content>
                </Container>
        )
    }
}

const localStyles = StyleSheet.create({
    buttons: {
        margin: '10%',
    }
})
