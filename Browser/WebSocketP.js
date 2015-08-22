"use strict"

// @Compiler-Compress "true"
// @Compiler-Transpile "true"
// @Compiler-Browserify "true"
// @Compiler-Output "WebSocketP.min.js"

const WebSocketPCommunication = require('sb-communication')

class WebSocketP {
  constructor(Options){
    let Me = this
    this.Communication = new WebSocketPCommunication(false)
    this.Connection = new WebSocket(Options)
    this.sendCallback = function(message) {
      Me.Connection.send(JSON.stringify(message))
    }
    this.Connection.addEventListener('message', function(Data){
      try {
        Data = JSON.parse(Data.data)
      } catch(err){
        return Me.emit('ParseError', Data)
      }
      Me.Communication.gotMessage(Me.sendCallback, Data)
    })
  }
  on(type, callback) {
    return this.Communication.on(type, callback)
  }
  request(Type, Message){
    return this.Communication.request(this.sendCallback, Type, Message)
  }
  terminate(){
    this.Connection.close()
  }
}
window.WebSocketP = WebSocketP
