//dependecies
import React, { Component }  from 'react';
import axios from 'axios';
import  { Link } from 'react-router-dom';
import config from '../../config.js';
import MusicDetails from '../MusicDetails';


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
        if (idUser != "") {
            axios.delete(`${config.api}users/${idUser}/musics/${musicId}`).then(res => {
                this.getFavorits(idUser);
            })
        }
    }

    getFavorits(id) {
        axios.get(`${config.api}users/${id}/musics`).then(res => {
            const favorits = res.data;
            if (favorits) {
                this.setState({ favorits });
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
            <div class="row">
                <h1 class="title"> Music List </h1>
                {this.state.musics.forEach(function (music, index) {
                    let isFavorit= false;
                    // check if this music is favorit
                    if( this.state.favorits.length > 0) {
                    this.state.favorits.forEach(favorits =>) {
                        isFavorit = favorits.id == music.id;
                    })
                }
                // if element is odd or even
                if(index%2==1){
                    //odd
                    return (
                     <div class="col-md-3">
                        <div class="boxMusic">
                            <a onClick={isFavorit ? this.removeFavorit.bind(this, music.id) : this.addFavorit.bind(this, music.id)} class="pointer pull-right"><i class= {favorit ? "fa fa-star iconStarActive" : "fa fa-star-o iconStar"} aria-hidden="true"></i></a>
                            <div id='musicBars'>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <h3>{music.track}</h3>
                            <div><Link to={'music/' + music.id}><i class="fa fa-info-circle" aria-hidden="true"></i> Details</Link></div>
                        </div>
                    </div>
                    )
                } else {
                    return (
                        <div class="col-md-3 col-md-offset-3">
                            <div class="boxMusic">
                                <a onClick={isFavorit ? this.removeFavorit.bind(this, music.id) : this.addFavorit.bind(this, music.id)} class="pointer pull-right"><i class= {favorit ? "fa fa-star iconStarActive" : "fa fa-star-o iconStar"} aria-hidden="true"></i></a>
                                <div id='musicBars'>
                                  <span></span>
                                  <span></span>
                                  <span></span>
                                  <span></span>
                                  <span></span>
                                </div>
                                <h3>{music.track}</h3>
                                <div><Link to={'music/' + music.id}><i class="fa fa-info-circle" aria-hidden="true"></i> Details</Link></div>
                            </div>
                        </div>
                    )
                }
            }, this)}
            </div>
        )
    }
}