import React, { Component } from 'react';

class MessageList extends Component {
  constructor (props) {
    super(props);

    this.state = {
      messages: [],
      newMessagesName: ''
    };

    this.messageRef = this.props.firebase.database().ref('messages');
  }

  //Fetch rooms from the database
  componentDidMount() {
    this.messageRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
  }

  //Controlled Component, keep the React state as the 'single source of truth'
  handleChange(event) {
    this.setState({newMessageName: event.target.value});
  }

  //Create the new room in Firebase
  //Prevent refresh
  //Reset newRoomName
  createMessage(event) {
    event.preventDefault();
    if (!this.state.newMessageName) { return }
    this.messageRef.push({ name: this.state.newMessageName });
    this.setState({ newMessageName: '' });
  }

  handleClick(event) {
    let messageName = event.target.innerText;
    let messageId = '';
    this.messageRef.orderByChild("name").equalTo(messageName).on('child_added', snapshot => {
      messageId = snapshot.key;
    });
    this.props.activeMessageView(messageId, messageName);
  }
//Create a row for each room in the database
//User input to create a new room in the database and render it
//Handle clicks on room names
  render() {
    return(
      <table id="message-list">
        <colgroup>
          <col id="message-name"/>
        </colgroup>
        <tbody>
          {
            this.state.messages.map( (message, index) =>
              <tr className="message" key={index} onClick= { (e) => this.handleClick(e) }>
                <td>{message.name}</td>
              </tr>
            )
          }
          <tr>
            <td>
              <form onSubmit={ (e) => this.createMessage(e)}>
                <input type="text" name="name" placeholder="New message" value={this.state.newMessageName} onChange={ (e) => this.handleChange(e) } />
                <input type="submit" value="Create" />
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default MessageList;
