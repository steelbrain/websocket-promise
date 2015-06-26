"use strict"

let EventEmitter = require('events').EventEmitter

class Client extends EventEmitter{
  constructor(Connection){
    super()
    this.Connection = Connection
    Connection.on('disconnect', function(){
      console.log("Connection closed")
    })
  }
}

module.exports = Client