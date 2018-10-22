import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList.js';
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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Chat React</h1>
        </header>
        <section>
        <RoomList
          firebase={firebase}
        />
        </section>
      </div>
    );
  }
}

export default App;
