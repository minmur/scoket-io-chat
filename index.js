const io = require('socket.io')(8000);

const RoomManager = require('./room-manager');
const createHandlers = require('./handlers');

const roomManager = RoomManager(io);

io.on('connection', (socket) => {
    const {
        handleMessage,
        handleDisconnect
    } = createHandlers(socket, roomManager);

    console.log(`${socket.id} connected...`);

    const defaultRoom = roomManager.getDefaultRoom();

    defaultRoom.addUser(socket);

    socket.on('message', handleMessage);

    socket.on('disconnect', () => {
      console.log(`${socket.id} disconnected...`);
      handleDisconnect();
    });
});

