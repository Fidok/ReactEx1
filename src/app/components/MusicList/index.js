//dependecies
import React, { Component }  from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//parts
import Details from "./details.js";

//configs
import config from '../../config.js';

//library
import Cookie from '../../library/cookie.js';


export default class MusicList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            musics: [],
            favorits: [],
            id: null,
            musicSelected: null
        };
        this.getFavorits = this.getFavorits.bind(this);
        this.addFavorit = this.addFavorit.bind(this);
        this.removeFavorit= this.removeFavorit.bind(this);
        const idUser = Cookie.getCookie("id");
        if (idUser != "") {
            this.getFavorits(idUser);
        }
    }

    addFavorit(musicId) {
        const idUser = Cookie.getCookie("id");
        const music = {
            "musicid" : musicId
        }
        if (idUser !== "") {
           axios.post(`${config.api}users/${idUser}/musics/`, music).then(res => {
               this.getFavorits(idUser);
           })
        }
    }

    removeFavorit(musicId) {
        const idUser = Cookie.getCookie("id");
        if (idUser !== "") {
            axios.delete(`${config.api}users/${idUser}/musics/${musicId}`).then(res => {
                this.getFavorits(idUser);
            })
        }
    }

    getFavorits(id) {
        axios.get(`${config.api}users/${id}/musics`).then(res => {
            this.setState({ favorits: res.data || {}});
        })
    }

    componentDidMount() {
        axios.get(config.api+'musics').then(res => {
            const musics = res.data;
            this.setState({ musics: musics });
        })
    }

    render() {
        return (
            <div class="row musicList">
                <Details />
                <div class="col-xs-12 col-lg-9">
                    {this.state.musics.map(function (music, index) {
                        let isFavorit= false;
                        // check if this music is favorit
                        if( this.state.favorits.length > 0) {
                            this.state.favorits.map(function (favorits) {
                                if(favorits.id == music.id) {
                                    isFavorit=true;
                                }
                            })
                        }
                        return (
                            <div class="music">
                                    <a onClick={isFavorit ? this.removeFavorit.bind(this, music.id) : this.addFavorit.bind(this, music.id)} class="pointer pull-left"><i class= {isFavorit ? "fa fa-star iconStarActive" : "fa fa-star-o iconStar"} aria-hidden="true"></i></a>
                                    <Link to={'music/' + music.id} class="pull-right"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></Link>
                                    <div class="music-track">{music.track}</div>
                                    <div>
                                        <span class="artist">{music.artist}</span>
                                        <span>&#9900;</span>
                                        <span class="album">{music.album}</span>
                                    </div>
                                </div>
                            )
                  }, this)
                }
            </div>
          </div>
        )
      }
}