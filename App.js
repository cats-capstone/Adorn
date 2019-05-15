import React from 'react';
import Routes from './js/components/Routes';
import { Root } from 'native-base';
import { Provider } from 'react-redux';
import store from './js/store/index';
console.disableYellowBox = true
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
