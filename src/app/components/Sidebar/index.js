// dependencies
import React, { Component }  from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import config from '../../config.js';
import Cookie from '../../library/cookie.js';

//assets
import UserImg from "../../../media/user.png";

// settings for modal
const customStyles = {
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: '#ededed'
    }
};

Modal.setAppElement('#app');

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            user:null,
            email:null,
            id: null
        };
        // function login and logout
        this.login = this.login.bind(this); 
        this.logout = this.logout.bind(this);
        //function modal
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        // function chech if user is logged
        this.checkUser = this.checkUser.bind(this);
        // check if user is logged
        this.checkUser();
    }

    menuEvent() {
        const menu = document.getElementsByClassName('sidebar')[0];
        menu.style.marginLeft = menu.offsetLeft === 0 ? '-220px' : 0;
    }

    checkUser() {
        const user=Cookie.getCookie("username");
        if (user != "") {
            this.state.user = user;
        }
    }

    login () {
        this.setState({modalIsOpen: false});
        const email = document.getElementById('emailAddress').value;
        if (email.length > 5) {
           this.setState({email});
            axios.get(`${config.api}users`).then(res => {
            const users = res.data;
            const login = users.filter(user => user.email === email);
            if(login.length >= 1){
                this.setState({user: login[0].username, id: login[0].id });
                Cookie.setCookie("username", this.state.user, 1);
                Cookie.setCookie("id", this.state.id, 1);
            } else {
                alert("Email not found");
            }
          })
        }
    }

    logout () {
        Cookie.deleteCookie("username");
        Cookie.deleteCookie("id");
        this.setState({user: null, id: null });
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        this.subtitle.style.color = '#000';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render() {
        return (
            <nav class="sidebar">
                <div class="sidebar-container">
                    <div class="menu-mobile" onClick={this.menuEvent}>
                        <span class="sr-only">Menu</span>
                        <i class="fa fa-bars" aria-hidden="true"></i>
                    </div>
                    <img class="logo" src="http://www.ubiwhere.com/static/img/ubiwhere-logo.svg" alt="logo ubiwhere" />
                    <div class="footer">
                        {this.state.user ? <div><img src={ UserImg } /> {this.state.user} </div> : 
                            <div>
                                <button class="btn btn-primary" type="button" onClick={this.openModal}>
                                    <i class="fa fa-sign-in" aria-hidden="true"></i> Login
                                </button>
                                <Modal
                                isOpen={this.state.modalIsOpen}
                                onAfterOpen={this.afterOpenModal}
                                onRequestClose={this.closeModal}
                                style={customStyles}
                                contentLabel="Login Modal"
                                overlayClassName="Overlay">
                                    <h3 ref={subtitle => this.subtitle = subtitle}>Please, insert your email!</h3>
                                    <hr />
                                    <form>
                                        <input id="emailAddress" type="email" />
                                    </form>
                                    <hr />
                                    <button onClick={this.login}><i class="fa fa-sign-in" aria-hidden="true"></i> Login</button>
                                </Modal>
                            </div>
                        }
                        {this.state.user ? <div><button class="btn btn-primary" type="button" onClick={this.logout}><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</button></div> : ""}
                    </div>
                </div>
            </nav>
        )
        }
    }