class SocketClientMock {
  constructor(clientName, server) {
    this.clientName = clientName;
    this.callbacks = {
      '/join': (room) => {
        this.server.joinRoom(this.clientName, room);
      },
    };
    this.server = server;
  }

  emit(message, data) {
    this.server.emit(this.clientName, message, data);
  }

  on(message, cb) {
    this.callbacks[message] = cb;
  }

  execute(message, data) {
    if (!this.callbacks[message])
      throw new Error('no callback for message ' + message);
    this.callbacks[message](data);
  }

  open() {
    // auto connect
    this.callbacks['connect']();
  }
}

class SocketServerMock {
  constructor() {
    this.rooms = {};
    this.clients = [];
  }

  emit(clientName, message, data) {
    this.clients.forEach((client) => {
      if (client.clientName !== clientName) {
        client.execute(message, data);
      }
    });
  }

  addClient(client) {
    this.clients.push(client);
  }

  joinRoom(clientName, room) {
    this.rooms[room] = [];
    this.rooms[room].push(clientName);
  }

  reset() {
    this.rooms = {};
    this.clients = [];
  }
}

export { SocketClientMock, SocketServerMock };
