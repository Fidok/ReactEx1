//dependecies
import React, { Component }  from 'react';

//assets
import albumImg from "../../../media/albuns.png";

export default () => (
        <div>
            <div class="col-xs-12 col-lg-3 details text-md-left">
                <div class ="col-lg-12 col-sm-4 col-xs-12"><img src={albumImg} alt="New musics" /></div>
                <div class="col-lg-12 col-sm-8 col-xs-12">
                    <h1>LF</h1>
                    <div class="name">Léo Ferreira</div>
                    <div class="songs">99 songs</div>
                    <button class="btn btn-primary">Play</button>
                </div>
            </div>
            <div class="hidden-lg col-xs-12">
                <hr class="separator"/>
            </div>
        </div>
)