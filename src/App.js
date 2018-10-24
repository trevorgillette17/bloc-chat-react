import React, { Component } from 'react';
import './index.css';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCi5BNEkSaPiBm0Nx4kNMg2CJD9Oz8j8l0",
    authDomain: "bloc-chat-3c62b.firebaseapp.com",
    databaseURL: "https://bloc-chat-3c62b.firebaseio.com",
    projectId: "bloc-chat-3c62b",
    storageBucket: "bloc-chat-3c62b.appspot.com",
    messagingSenderId: "732214085219"
};
firebase.initializeApp(config);

class App extends Component {
  constructor (props){
    super(props);

    this.state = {
      activeRoomName: 'room1',
      activeRoomId: 1,
      username: 'Guest',
      isLoggedIn: false
    };
  }

  activeRoomView = (newActiveRoomId, newActiveRoomName) => {
    this.setState({
      activeRoomId: newActiveRoomId,
      activeRoomName: newActiveRoomName
    });
  }

  setUser = (user) => {
    const isLoggedIn = this.state.isLoggedIn;
    if ( isLoggedIn === true) {
      this.setState({
        isLoggedIn: false,
        username: 'Guest'
      });
    } else {
      this.setState({
        isLoggedIn: true,
        username: user.displayName
      });
    }
  }

  //Render RoomList
  //Render MessageList
  //Render User
  render() {
    return (
      <div className="app">
        <sidebar className="sidebar">
          <header className="header">
            <h1 className="title">Bloc Chat</h1>
          </header>
          <RoomList
            firebase={firebase}
            className="roomList"
            activeRoomName={this.state.activeRoomName}
            activeRoomId={this.state.activeRoomId}
            activeRoomView={this.activeRoomView}
          />
        </sidebar>
        <section className="messageList">
          <User
            firebase={firebase}
            setUser={this.setUser}
            username={this.state.username}
          />
          <MessageList
            firebase={firebase}
            activeRoomName={this.state.activeRoomName}
            activeRoomId={this.state.activeRoomId}
            activeRoomView={this.activeRoomView}
          />
        </section>
      </div>
    );
  }
}

export default App;
