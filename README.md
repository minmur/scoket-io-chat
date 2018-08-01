# scoket-io-chat

Some playgroud for socket.io chat. It has no client, use some utility like [iocat](https://www.npmjs.com/package/iocat).

### Connecting to chat

Chat is available on ws://45.32.232.56:8000

If using iocat, run this:
```iocat --socketio ws://45.32.232.56:8000```

After connecting you will be added to public chat room.

Every 5 s you will get some random number.

### Available "commands"

**count** - will list number of users connected to current room

**secret** - will join some private chat room
