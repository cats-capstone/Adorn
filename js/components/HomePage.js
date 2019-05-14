import React, { Component } from 'react';
import { StyleSheet, Image, } from 'react-native';
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
  Header,
  Title,
  Left,
  Right
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { database, auth } from '../../firebase'

export default class HomePage extends Component {
  constructor() {
    super()

    this.state = {
      status: 'Sign In',
      email: '',
      password: ''
    }

    this.submit = this.submit.bind(this)
  }

  submit() {
    if (this.state.status === 'Sign Up') {
      auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(function() {
          const uId = auth.currentUser.uid
          const userEmail = auth.currentUser.email
          const usersRef = database.ref('/users')
          usersRef.child(uId).set({email: userEmail})
          Actions.Products()
        })
        .catch(function(error) {
          console.log(error.message)
      })
    } else {
      auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(function() {
        Actions.Products()
      })
      .catch(function(error) {
        console.log(error.message)
      })
    }
  }

  render() {
    return (
      <Container>
        <Content>
        <Header>
                <Title>{this.state.status}</Title>
        </Header>
          <View style={localStyles.content} marginTop='10%'>
          <Image source={require('../res/logo.png')} style={{height: 300, width: null, flex: 1, resizeMode: "contain"}}/>
            <Form>
              <Item floatingLabel>
                <Label>Email</Label>
                <Input
                  name="email"
                  value={this.state.email}
                  onChangeText={text => this.setState({email: text})} />
              </Item>
              <Item floatingLabel last>
                <Label>Password</Label>
                <Input
                  name="password"
                  value={this.state.password}
                  onChangeText={text => this.setState({password: text})} />
              </Item>
            </Form>

            <Button block style={localStyles.buttons}
                    onPress={this.submit}>
              <Text>Submit</Text>
            </Button>
            <Left>
            {this.state.status === 'Sign Up' ?
            <Button block style={localStyles.buttons}
            onPress={()=>{
              this.setState({status: 'Sign In'})
              
            }}>
            <Text>Existing User? Sign In</Text>
            </Button>
            :
            <Button block style={localStyles.buttons} 
                    onPress={()=>{
                      this.setState({status: 'Sign Up'})
                    }}>
              <Text>New User? Sign Up</Text>
              </Button>
            }
            </Left>
            <Right>
            <Button 
              block
              style={localStyles.buttons}
              onPress={() => {
                Actions.Products();
              }}
            >
              <Text>Continue as Guest</Text>
            </Button>
            </Right>
          </View>
        </Content>
      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  buttons: {
    margin: 10,
    backgroundColor: "#8754B4"
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
});
