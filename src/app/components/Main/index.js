//dependecies
import React, { Component }  from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import config from '../../config.js';
import MusicDetails from '../MusicDetails';
import MusicList from '../MusicList';

export default class Main extends Component {
    render() {
    return (
        <main id="content" class="container-fluid">
            <Switch>
                <Route exact path='/' component={MusicList} />
                <Route path='/music/:id' component={MusicDetails} />
            </Switch>
        </main>
    )
  }
}