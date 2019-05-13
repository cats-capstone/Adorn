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
  Header,
  Title
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { database, auth } from '../../firebase'

export default class HomePage extends Component {
  constructor() {
    super()

    this.state = {
      status: 'Sign up',
      email: '',
      password: ''
    }

    this.submit = this.submit.bind(this)
  }

  submit() {
    if (this.state.status === 'Sign up') {
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
          <View style={localStyles.content}>
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
            {this.state.status === 'Sign up' ?
            <Button block style={localStyles.buttons}
            onPress={()=>{
              this.setState({status: 'Sign in'})
              
            }}>
            <Text>Existing User? Sign In</Text>
            </Button>
            :
            <Button block style={localStyles.buttons}
                    onPress={()=>{
                      this.setState({status: 'Sign up'})
                    }}>
              <Text>New User? Sign Up</Text>
              </Button>
            }

            
            
            
            
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
