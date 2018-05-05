// dependecies
import React, { Component }  from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../../config.js';


export default class MusicDetails extends Component { 
    constructor(props) {
        super(props);
        this.state = {
        music_id: props.match.params.id,
        musicDetails: []
    };
}

    componentDidMount() {
        axios.get(`${config.api}musics/${this.state.music_id}`).then(res => {
            this.setState({musicDetails: res.data || [] });
        })
    }

    render() {
        return (
            <div>
                <h1 class="title">Music Details</h1>
                {this.state.musicDetails.map( music => {
                    return (
                        <div>
                            <div class="flex row">
                                <div class="col-md-offset-2 col-md-3 col-xs-2 boxMusic">
                                    <i class="fa fa-music big" aria-hidden="true"></i>
                                    <div id='musicBars'>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                                <div class="col-md-6 col-xs-10 text-left">
                                    <h3 class="top10"> {music.track} </h3>
                                    <h4>Album: <small class="text-muted">{music.album}</small></h4>
                                    <h4>Artist: <small class="text-muted">{music.artist}</small></h4>
                                </div>
                            </div>
                            <div class="row top10">
                                <Link to='/' class="btn btn-primary">Back</Link>
                            </div>
                        </div>
                    )
                })
            }
          </div>
        )
    }
}