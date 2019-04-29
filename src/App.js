import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/index';
import { StoreContext } from 'redux-react-hook';


import { Triggers } from './components/Triggers';
import { Game } from './components/Game';
import { socket } from './io';

class App extends React.Component {

  componentDidMount() {
  }

  render() {
    return (
      <Provider store={store}>
        <StoreContext.Provider value={store}>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <Game />
              <Triggers />
            </header>
          </div>
        </StoreContext.Provider>
      </Provider>
    );
  }

}

export default App;
