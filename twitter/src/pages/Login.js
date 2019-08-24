import React, { Component } from 'react';
import logoTwitter from '../twitter.svg';
import './Login.css';

export default class Login extends Component{

    state = {
        username: ''
    }

    handleChange = e => {
        this.setState({ username: e.target.value })
    }

    handleSubmit = e => {
        const { username } = this.state;
        e.preventDefault();
        
        if(!username.length) return;

        localStorage.setItem('@twitter:username', username);

        this.props.history.push('/timeline');
    }

    render(){
        return (
            <div className="login-wrapper">
                 <img src={logoTwitter} alt=""/>
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="Nome de usuário" onChange={this.handleChange} />
                    <button type="submit">Entrar</button> 
                </form>
            </div>
        );   
    }
}