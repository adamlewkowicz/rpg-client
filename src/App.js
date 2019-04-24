import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/index';

import { Triggers } from './components/Triggers';
import { socket } from './io';

class App extends React.Component {

  componentDidMount() {
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Triggers />
          </header>
        </div>
      </Provider>
    );
  }

}

export default App;
