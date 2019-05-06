import React from 'react';
import Routes from './js/components/Routes';
import { Root } from 'native-base';

export default class App extends React.Component {
  render() {
    return (
      <Root>
        <Routes />
      </Root>
    );
  }
}
