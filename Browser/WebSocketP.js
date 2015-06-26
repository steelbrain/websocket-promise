"use strict"
// @Compiler-Compress "true"
// @Compiler-Transpile "true"
// @Compiler-Output "WebSocketP.min.js"
class WebSocketP extends EventEmitter{
  constructor(Options){
    super()
    let Me = this
    this.Connection = new WebSocket(Options)
    this.Connection.addEventListener('message', function(Data){
      try {
        Data = JSON.parse(Data.data)
        if(!Data.EXCHANGE) throw null
      } catch(err){
        return Me.emit('ParseError', Data)
      }
      if(Data.Type === 'Request'){
        Data.Result = null
        Me.emit(Data.SubType, Data.Message, Data)
        Me.emit('All', Data.Message, Data)
      } else if(Data.Type === 'Broadcast'){
        Me.emit(Data.SubType, Data.Message, Data)
        Me.emit('All', Data.Message, Data)
      } else if (Data.Type === 'Reply'){
        Me.emit(`JOB:${Data.ID}`, Data.Message)
      }
    })
  }
  Send(Type, Message){
    Message = Message || ''
    this.Connection.send(JSON.stringify({Type: 'Broadcast', SubType: Type, Message: Message, EXCHANGE: true}))
    return this
  }
  Request(Type, Message){
    Message = Message || ''
    let Me = this
    return new Promise(function(Resolve){
      let JobID = (Math.random().toString(36)+'00000000000000000').slice(2, 7+2)
      Me.once(`JOB:${JobID}`, Resolve)
      Me.Connection.send(JSON.stringify({Type: 'Request', SubType: Type, Message: Message, ID: JobID, EXCHANGE: true}))
    })
  }
  Finished(Job){
    this.Connection.send(JSON.stringify({Type: 'Reply', ID: Job.ID, Message: Job.Result, EXCHANGE: true}))
  }
  Terminate(){
    this.Connection.close()
  }
}
window.WebSocketP = WebSocketP