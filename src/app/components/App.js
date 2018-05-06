// dependecies
import React, { Component }  from 'react';
import Sidebar from './Sidebar';
import Player from './Player';
import Main from './Main';

export default class App extends Component {
  render() {
    return (
        <div id="wrapper">
            <Sidebar />
            <Main />
            <Player />
        </div>
    )
  }
}