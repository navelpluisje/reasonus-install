import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import {App} from './App';
import { store } from './store/store';
import { GlobalStyle } from './styles/GlobalStyle';

function render() {
  ReactDOM.render(<Provider store={store}>
    <HashRouter>
      <GlobalStyle />
      <App />
    </HashRouter>
  </Provider>
  , document.getElementById('app'));
}

render();
 