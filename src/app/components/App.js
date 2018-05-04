// dependecies
import React, { Component }  from 'react';
import Sidebar from './Sidebar';
import Main from './Main';

export default class App extends Component {
  render() {
    return (
        <div id="wrapper">
            <Sidebar />
            <Main />
        </div>
    )
  }
}