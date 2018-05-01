// dependencies
import React, { Component }  from 'react';
import axios from 'axios';
import config from '../../config.js';
import Modal from 'react-modal';

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
     // function cookie
     this.setCookie = this.setCookie.bind(this);
     this.checkUser = this.checkUser.bind(this);
     this.getCookie = this.getCookie.bind(this);
     this.deleteCookie = this.deleteCookie.bind(this);
     // check if user is logged
    this.checkUser();
  }
  
    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    
    checkUser() {
        var user=this.getCookie("username");

        if (user != "") {
            this.state.user = user;
        }
    };
    
    setCookie(cname,cvalue,exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    
    deleteCookie( name ) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    
      login () {
        this.setState({modalIsOpen: false});
        let email = document.getElementById('emailAddress').value;
        if (email.length > 5) {
           this.setState({email: email}); 
            axios.get(config.api+'users')
          .then(res => {
            const users = res.data;
            var login = users.filter(function(user){
                return user.email === email;
            });
            if(login.length >= 1){
                this.setState({user: login[0].username, id: login[0].id });
                this.setCookie("username", this.state.user, 1);
                this.setCookie("id", this.state.id, 1);
            } else {
                alert("Email not found");
            }
          })
        }
      }
    
    logout () {
        this.deleteCookie("username");
        this.deleteCookie("id");
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
      <nav id="sidebar">
        <div class="sidebar-header">
            <img class="logo" src="http://www.ubiwhere.com/static/img/ubiwhere-logo.svg" alt="logo ubiwhere" />
        </div>
        {this.state.user ? "Hello, "+this.state.user+"!" : 
        <div>
            <button class="btn btn-primary" type="button" onClick={this.openModal}><i class="fa fa-sign-in" aria-hidden="true"></i> Login</button>
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
        {this.state.user ? <div><button class="btn btn-primary" type="button" onClick={this.logout}><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</button></div> : ""
        }
    </nav>
    )
  }
}