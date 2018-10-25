import React, {Component} from 'react';

class MessageList extends Component {
  constructor (props) {
    super(props);

    this.state = {
      messages: [],
      newMessageText: ''
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  //Fetch messages from the database
  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
  }

  //Controlled Component, keep the React state as the 'single source of truth'
  handleChange(event) {
    this.setState({newMessageText: event.target.value});
  }

  //Create message in firebase
  createMessage(event) {
    event.preventDefault();
    if (!this.state.newMessageText) { return }
    this.messagesRef.push({ content: this.state.newMessageText, roomId: this.props.activeRoomId, username: this.props.username, sentAt: this.props.firebase.database.ServerValue.TIMESTAMP });
    this.setState({ newMessageText: '' });
  }

  //Create message table with header
  //Filter messages using database UID then map them to table rows
  render() {
    return (
      <table id="message-list">
        <colgroup>
          <col id="username-message" />
          <col id="timestamp" />
        </colgroup>
        <thead>
          <tr>
            <th>{this.props.activeRoomName}</th>
          </tr>

        </thead>
          {
            this.state.messages.filter( message => message.roomId === this.props.activeRoomId ).map( (message, index) =>
            <tbody key={message.sentAt}>
              <tr key={message.sentAt}>
                <td className="username">{message.username}</td>
                <td className="timestamp">{this.props.formatTime(message.sentAt)}</td>
              </tr>
              <tr className="message" key={message.key}>
                <td>{message.content}</td>
              </tr>
            </tbody>
            )
          }
          <tfoot>
            <tr>
              <td>
                <form onSubmit={ (e) => this.createMessage(e)}>
                  <input type="textarea" placeholder="New Message" value={this.state.newMessageText} onChange={ (e) => this.handleChange(e) } />
                  <input type="submit" value="Send" />
                </form>
              </td>
            </tr>
          </tfoot>
      </table>
    );
  }
}

export default MessageList;
