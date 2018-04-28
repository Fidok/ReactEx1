import React, { Component }  from 'react';
import axios from 'axios';
import config from '../../config.js';
import  { Link } from 'react-router-dom';


export default class MusicDetails extends Component {
   
 constructor(props) {
    super(props);
    this.state = {
        music_id: props.match.params.id,
        music_details : []
        
    };
  }

  componentDidMount() {
    axios.get(config.api+'musics/'+this.state.music_id)
      .then(res => {
        if (res.data.length === 1) {
            const details = res.data;
           this.setState({music_details: details }); 
        }
      })
  }

  render() {
    return (
      <ul>
        { 
            this.state.music_details.map(function (music) {
                 return (
                     <div>
                        <li>{music.album}</li>
                        <li>{music.artist}</li>
                        <li>{music.track}</li>
                        <li>{music.id}</li>
                        <Link to='/'>Back</Link>
                    </div>
                    )
                })
        }
      </ul>
    )
      
  }
}