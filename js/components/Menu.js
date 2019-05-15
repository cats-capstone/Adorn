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

export default class Menu extends Component {
    render() {
        return (
                <View style={localStyles.modalContainer}>
                        <Button
                            style={localStyles.buttons}
                            onPress={() => {
                                Actions.Account()
                            }}>
                            <Text>Account</Text>
                        </Button>
                        <Button style={localStyles.buttons}>
                            <Text>Saved Rooms</Text>
                        </Button>
                        <Button style={localStyles.buttons}
                                onPress={() => this.props.close()}>
                            <Text>Close</Text>
                        </Button>
                </View>
        )
    }
}

const localStyles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 4,
        borderColor: '#C0C0C0',
        borderWidth: 2,
        marginHorizontal: 60,
        marginVertical: 120   
    },
    buttons: {
        margin: '10%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#8754B4'
    }
})
