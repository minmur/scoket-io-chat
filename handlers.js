module.exports = function createHandlers(socket, roomManager) {
  function handleMemberCountRequest() {
    const lastJoinedRoom = Object.values(socket.rooms).slice(-1)[0];
    const usersCount = roomManager.getUserCount(lastJoinedRoom);

    socket.emit('message', `There are ${usersCount} user(-s) in room ${lastJoinedRoom}`);
  }

  function handlePrivateRoomJoin(secret) {
    const privateRoom = roomManager.getPrivateRoom();
    privateRoom.addUser(socket);
  }

  function handleMessage(msg) {
      switch (msg) {
          case 'count':
              handleMemberCountRequest();
              break;

          case 'secret':
            handlePrivateRoomJoin(msg);
            break;

          default:
              socket.broadcast.emit('message', msg);
              break;
      }
  }

  function handleDisconnect() {
    roomManager.removeUser(socket);
  }

  return {
      handleMessage,
      handleDisconnect
  };
};
