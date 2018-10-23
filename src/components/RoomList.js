import React, { Component } from 'react';

 class RoomList extends Component {
  constructor (props) {
    super(props);

     this.state = {
      rooms: [],
      newRoomName: ''
    };

     this.roomsRef = this.props.firebase.database().ref('rooms');
  }
  createRoom(event) {
      event.preventDefault();
    if (!this.state.newRoomName) { return }
    this.roomsRef.push({ name: this.state.newRoomName });
    this.setState({ newRoomName: '' });
    }
      handleChange(event) {
    this.setState({newRoomName: event.target.value});
  }

   componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

    handleClick(event) {
    let roomName = event.target.innerText;
    let roomId = '';
    this.roomsRef.orderByChild("name").equalTo(roomName).on('child_added', snapshot => {
      roomId = snapshot.key;
    });
    this.props.activeRoomView(roomId, roomName);
  }
   render() {
    return(
      <table id="room-list">
        <colgroup>
          <col id="room-name"/>
                  </colgroup>
        <tbody>
          {
            this.state.rooms.map( (room, index) =>
              <tr className="room" key={index} onClick= { (e) => this.handleClick(e) }>
                <td>{room.name}</td>
              </tr>
            )
          }
          <tr>
            <td>
              <form onSubmit={ (e) => this.createRoom(e)}>
                <input type="text" name="name" placeholder="New room name" value={this.state.newRoomName} onChange={ (e) => this.handleChange(e) } />
                <input type="submit" value="Create" />
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
 export default RoomList;
