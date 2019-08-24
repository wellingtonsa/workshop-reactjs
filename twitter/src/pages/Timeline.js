import React, { Component } from 'react';
import logoTwitter from '../twitter.svg';
import api from '../services/api';
import Tweet from '../components/Tweet';
import socket from 'socket.io-client';
import './Timeline.css';

export default class Timeline extends Component{

    state = {
        tweets:[],
        newTweet: ''
    }

    async componentDidMount(){
        this.subcribeToEvents();
        const response = await api.get('/tweets');
        const { data } = response;
        this.setState({ tweets: data });
   }

   subcribeToEvents = () => {
       const io = socket('http://10.5.6.222:3000');

       io.on('tweet', tweet => {
           this.setState({ tweets: [tweet, ...this.state.tweets] });
       })

       io.on('like', tweet => {
        this.setState({ tweets: this.state.tweets.map(t => 
            t._id === tweet._id ? tweet : t
        )});
    })
   }

   handleChange = e => {
       this.setState({ newTweet: e.target.value })
   }

   handleSubmit = async e => {
       if(e.keyCode !== 13) return;

       const { newTweet } = this.state;
       const author = localStorage.getItem('@twitter:username');

       await api.post('/tweets', {
           author: author,
           content: newTweet
       })
   }

    render(){
        return (
            <div className="timeline-wrapper">
                <img src={logoTwitter} height={24} alt=""/>            
                <form>
                    <textarea
                    onChange={this.handleChange}
                    onKeyDown={this.handleSubmit}
                    placeholder="O que está acontencendo?"/>
                </form>

                <ul className="tweet-list">
                    {this.state.tweets.map( tweet => (
                        <Tweet key={tweet._id} tweet={tweet}/> 
                    ))}
                </ul>    
            </div>
        );   
    }
}