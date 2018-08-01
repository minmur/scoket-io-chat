const getRandomNumber = require('./utils').getRandomInteger;

module.exports = function({name}, io) {
  const members = new Map();

  setInterval(() => {
    _broadcastRandomNumber();
  }, 5000);

  function broadcastMessage(msg) {
    io.to(name).emit('message', msg);
  }

  function _broadcastRandomNumber() {
    broadcastMessage(getRandomNumber());
  }

  function addUser(socket) {
    socket.join(name, () => {
      members.set(socket.id, socket);
    }).emit('message', `Welcome to ${name}, ${socket.id}`);
  }

  function removeUser(socket) {
    socket.leave(name, () => {
      members.delete(socket.id);
    })
  }

  function getUsersCount() {
    return members.size;
  }

  return {
    broadcastMessage,
    addUser,
    removeUser,
    getUsersCount
  }
}
