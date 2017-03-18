WebSocket-Promise
===========

[![Greenkeeper badge](https://badges.greenkeeper.io/steelbrain/websocket-promise.svg)](https://greenkeeper.io/)
WebSocket-Promise is an extremely lightweight Promise wrapper for native HTML5 WebSockets written in JS. It provides an easy to use API on both the Browser and Server Side.

WebSocket-Promise internally uses [Le-Emitter][Le-Emitter] for the Browser-Sided event emitting part, You can replace it with an EventEmitter of your choice.

#### Hello World
Node
```js
var WebSocketP = require('websocket-promise')
var Server = new WebSocketP({port: 8090})
Server.onConnection(function(Client){
  Client.on('Hello', function(Job){
    console.log(Job.Message) // "World"
    Job.Response = 'World'
  })
})
```
Browser
```js
var Connection = new WebSocketP("ws://localhost:8090")
Connection.Request("Hello", "World").then(function(Response){
  console.log(Response) // "World"
})
```

#### API
```js
enum JobType = {Broadcast, Reply, Request}
type Job = shape(Type => JobType, SubType => string, Message => Mixed, ?ID => String, EXCHANGE => true)
class Server{
  constructor(Options: Object) // Available Options: https://github.com/websockets/ws/blob/master/lib/WebSocketServer.js#L25
  onConnection(Callback: Function<ServerClient>): void
  Broadcast(Type: String, Message: Any): void
}
class ServerClient{
  on(Type: String, Callback: Function): Disposable
  request(Type: String, Message): Promise
  terminate(): void
}
class WebSocketP{ // Available under same name in browser
  on(Type: String, Callback: Function): Disposable
  request(Type: String, Message): Promise
  terminate(): void
}
```

#### License
This project is licensed under the terms of MIT License. See the License file for more info.

[Le-Emitter]:https://github.com/steelbrain/Le-Emitter
