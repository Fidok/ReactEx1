import React, { Component }  from 'react';
import axios from 'axios';
import config from '../../config.js';
import MusicDetails from '../MusicDetails';
import MusicList from '../MusicList';
import  { Route, Switch } from 'react-router-dom';

export default class Main extends Component {
   

  render() {
    return (
        <main id="wrapper">
            <Switch>
                <Route exact path='/' component={MusicList} />
                <Route path='/music/:id' component={MusicDetails} />
            </Switch>
        </main>
    )
  }
}