"use strict"

const Communication = require('sb-communication')
const EventEmitter = require('events').EventEmitter

class Client extends EventEmitter{
  constructor(Connection, Server){
    super()
    let Me = this
    this.Server = Server
    this.Connection = Connection
    this.Communication = new Communication(false)
    this.Connection.on('close', this.emit.bind(this, 'close'))
    this.sendCallback = function(message) {
      Connection.send(JSON.stringify(message))
    }
    this.Connection.on('message', function(Data, Flags){
      if(Flags.binary){
        return Me.emit('Binary', Flags.buffer)
      }
      try {
        Data = JSON.parse(Data)
      } catch(err){
        return Me.emit('ParseError', Data)
      }
      Me.Communication.gotMessage(Me.sendCallback, Data)
    })
    this.on('Ping', function(Job){
      Job.Response = "Pong"
    })
  }
  on(type, callback) {
    return this.Communication.on(type, callback)
  }
  broadcast(Type, Message){ // Same like broadcast but works like Broadcast Except
    for(let Connection of this.Server.Server.clients){
      let ClientConnection = this.Server.Connections.get(Connection)
      if(ClientConnection && ClientConnection !== this){ // Of course it's not undefined but still
        ClientConnection.request(Type, Message)
      }
    }
  }
  request(Type, Message){
    return this.Communication.request(this.sendCallback, Type, Message)
  }
  terminate(){
    this.Connection.close()
  }
}

module.exports = Client
