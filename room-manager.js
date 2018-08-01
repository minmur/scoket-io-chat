const roomsList =
  [{
      name: 'default',
      private: false
  }, {
      name: 'SomePrivacyPlease',
      private: true,
      secret: 'secret'
  }];

const Room = require('./room');

module.exports = function(io) {
  const rooms = new Map(
      roomsList.map((room) => [
          room.name,
          new Room(room, io)
      ])
  );

  function getDefaultRoom() {
      return rooms.get('default');
  }

  function getPrivateRoom() {
    return rooms.get('SomePrivacyPlease');
  }

  function removeUser(socket) {
    rooms.forEach((room) => room.removeUser(socket));
  }

  function getUserCount(roomName) {
    return rooms.get(roomName).getUsersCount();
  }

  return {
      getDefaultRoom,
      getPrivateRoom,
      removeUser,
      getUserCount
  }
}
