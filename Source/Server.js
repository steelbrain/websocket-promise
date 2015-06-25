"use strict"

let EventEmitter = require('events').EventEmitter
let WS = require('ws')

class Server extends EventEmitter{
  constructor(Options){
    super()
    this.Server = WS.createServer(Options)
    this.Server.on('connection', _onConnection.bind(this))
  }
  _onConnection(Connection){
    console.log("Client Connected")
  }
  onConnection(Callback){
    this.on('connection', Callback)
  }
}

module.exports = Server