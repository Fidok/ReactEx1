//dependecies
import React, { Component }  from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../../config.js';

//assets
import albumImg from "../../../media/albuns.png";

export default class MusicList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            musics: [],
            favorits: [],
            id: null,
            musicSelected: null
        };
        this.getCookie = this.getCookie.bind(this);
        this.getFavorits = this.getFavorits.bind(this);
        this.addFavorit = this.addFavorit.bind(this);
        this.removeFavorit= this.removeFavorit.bind(this);
        const idUser = this.getCookie("id");
        if (idUser != "") {
            this.getFavorits(idUser);
        }
    }

    addFavorit(musicId) {
        const idUser = this.getCookie("id");
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
        const idUser = this.getCookie("id");
        if (idUser !== "") {
            axios.delete(`${config.api}users/${idUser}/musics/${musicId}`).then(res => {
                this.getFavorits(idUser);
            })
        }
    }

    getFavorits(id) {
        axios.get(`${config.api}users/${id}/musics`).then(res => {
            const favorits = res.data;
            if (favorits) {
                this.setState({ favorits: favorits });
            }
        })
    }

    getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
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
                <div class="col-xs-12 col-lg-3 details">
                    <div class ="col-lg-12 col-xs-4"><img src={albumImg} alt="New musics" /></div>
                    <div class="col-lg-12 col-xs-8">
                        <h1>LF</h1>
                        <div class="name">Léo Ferreira</div>
                        <div class="songs">99 songs</div>
                        <button class="btn btn-primary">Play</button>
                    </div>
                </div>
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