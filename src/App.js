import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import { StoreContext } from 'redux-react-hook';

import { Triggers } from './components/Triggers';
import { Game } from './components/Game';
import { GameRenderer } from './components/GameRenderer';
import { Loading } from './components/Loading';
import { UIContainer } from './components/UIContainer';

class App extends React.Component {

  componentDidMount() {
  }

  render() {
    return (
      <Provider store={store}>
        <StoreContext.Provider value={store}>
          <div className="App">
            <header className="App-header">
              {/* <img src={logo} className="App-logo" alt="logo" /> */}
              {/* <Game /> */}
              <UIContainer />
              <Loading
                children={<GameRenderer />}
              />
              <Triggers />
            </header>
          </div>
        </StoreContext.Provider>
      </Provider>
    );
  }

}

export default App;
