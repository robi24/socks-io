# socks-io

Your socks for the [socket-io](http://socket.io/). Just a very simple non-blocking mocking lib, but useful if you don't care about the server and just want to test the clients interactions. Supports `socket.on`, `socket.emit` and `socket.open`.

## Contents

- [Installation](#installation)
- [Usage](#usage)
- [Notes](#notes)

## Installation

```shell
yarn add socks-io
```

or

```shell
npm i socks-io
```

## Usage

```js
import { connect } from "socket.io-client";
import { Session } from "mySocketSessionHandler";
import { SocketServerMock, SocketClientMock } from "./socket.mock";

let COUNT = 0;
// mock the connect(endpoint, socketConfig)
jest.spyOn(socketClient, "connect").mockImplementation(() => {
  const _socketClientMock = new SocketClientMock(COUNT.toString(), SServer);
  // we need to add a clients to the server so they can interact with each other
  SServer.addClient(_socketClientMock);
  COUNT++;
  return _socketClientMock;
});

describe("Session", () => {
  let user1Session;
  let user2Session;

  beforeEach(() => {
    SServer.reset(); // isolate the tests
    user1Session = new Session();
    user2Session = new Session();
  });

  it.skip("should fire the EXAMPLE signal after we run the session", (done) => {
    // wait for handleExampleSignal to be called
    jest.spyOn(user1Session, "handleExampleSignal").mockImplementation(() => {
      done();
    });

    // start the sessions
    user1Session.run();
    user2Session.run();
  });
});
```

## Notes

Emit `socket.emit('/join', 'room)` to join a room
