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

export default class Menu extends Component {
    render() {
        return (
           <View style={localStyles.modalContainer}>
               {
                   auth.currentUser ?
                    <View>
                        <Text>Welcome {auth.currentUser.email}!</Text>
                        <Button style={localStyles.buttons}
                            onPress={this.props.close}>
                        <Text>View Saved Rooms</Text>
                        </Button>
                    </View> :

                    <View>
                        <Text>You're not signed in!</Text>
                        <Text>Don't have an account?</Text>
                        <Button style={localStyles.buttons}
                                onPress={() => {
                                    this.props.close()
                                    Actions.HomePage()
                                }}>
                            <Text>Sign up now!</Text>
                        </Button>
                    </View>

               }
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
