import React from 'react';
import Routes from './js/components/Routes';
import { Root } from 'native-base';
import store from './redux'
import {Provider} from 'react-redux'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          <Routes />
        </Root>
      </Provider>
    );
  }
}
