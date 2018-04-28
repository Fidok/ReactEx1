import React, { Component }  from 'react';
import axios from 'axios';
import config from '../../config.js';
import MusicDetails from '../MusicDetails';
import  { Link } from 'react-router-dom';

export default class MusicList extends Component {
   
 constructor(props) {
    super(props);
    this.state = {
        musics: []
    };
  }

  componentDidMount() {
    axios.get(config.api+'musics')
      .then(res => {
        const musics = res.data;
        this.setState({ musics });
      })
  }

  render() {
    return (
      <ul>
        { 
            this.state.musics.map(function (music) {
                 return (
                     <div>
                        <li>{music.album}</li>
                        <li>{music.artist}</li>
                        <li>{music.track}</li>
                        <Link to={'music/' + music.id}>{music.id}</Link>
                    </div>
                    )
                })
        }
      </ul>
    )
  }
}