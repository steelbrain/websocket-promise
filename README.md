WebSocket-Promise
===========
WebSocket-Promise is an extremely lightweight Promise wrapper for native HTML5 WebSockets written in JS. It provides an easy to use API on both the Browser and Server Side.

WebSocket-Promise internally uses [Le-Emitter][Le-Emitter] for the Browser-Sided event emitting part, You can replace it with an EventEmitter of your choice.

#### Hello World
Node
```js
var WebSocketP = require('websocket-promise')
var Server = new WebSocketP({port: 8090})
Server.onConnection(function(Client){
  Client.on('Hello', function(Request, Job){
    console.log(Request) // "World"
    Job.Result = Request
    Client.Finished(Job)
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
  Send(Type: String, Message: Any): void
  Request(Type: String, Message: Any): Promise<Result>
  Finished(Job: Job): void
  on(Type: String, Callback: Function<Request: Any, Job: Job>): void
  Terminate(): void
}
class WebSocketP{ // Available under same name in browser
  Send(Type: String, Message: Any): void
  Request(Type: String, Message: Any): Promise<Result>
  Finished(Job: Job): void
  on(Type: String, Callback: Function<Request: Any, Job: Job>): void
  Terminate(): void
}
```

#### License
This project is licensed under the terms of MIT License. See the License file for more info.