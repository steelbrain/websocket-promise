"use strict"

let EventEmitter = require('events').EventEmitter
let WS = require('ws')

let Client = require('./Client')

class Server extends EventEmitter{
  constructor(Options){
    super()
    this.Server = WS.createServer(Options)
    this.Server.on('connection', this._onConnection.bind(this))
    this.Connections = new WeakMap // this.Server.clients <--> this.Connections
  }
  _onConnection(Connection){
    let ClientConnection = new Client(Connection, this)
    this.Connections.set(Connection, ClientConnection)
    this.emit('connection', ClientConnection)
  }
  onConnection(Callback){
    this.on('connection', Callback)
    return this
  }
  Broadcast(Type, Message){
    for(let Connection of this.Server.clients){
      let ClientConnection = this.Connections.get(Connection)
      if(ClientConnection) { // Of course it's not undefined but still
        ClientConnection.Send(Type, Message)
      }
    }
  }
}

module.exports = Server
