import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import cors from 'cors'
import { PORT } from './config/server.config.js'
import apiRouter from './routes/index.js'
import chokidar from 'chokidar'
import { handleEditorSocketEvents } from './socketHandlers/editorHandlers.js'
import { handleContainerCreate } from './containers/handleContainerCreation.js'
import { WebSocketServer } from 'ws'
import { handleTerminalCreation } from './containers/handleTerminalCreation.js'

const app = express()
const server = createServer(app)
const io = new Server(server,{
    cors : {
        origin : '*',
        method : ['GET','POST']
    }
})


app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

// io.on('connection',(socket)=>{
//     console.log("A user connected")
// })

const router = express.Router()

app.use('/api',apiRouter)

app.get('/ping',(req,res)=>{
    return res.json({
        message : "pong at index.js"
    })
})

const editorNamespace = io.of('/editor')

editorNamespace.on('connection',(socket)=>{
    console.log("Editor connected");

    // console.log("Socket query log : ",socket.handshake.query)
    let projectId = socket.handshake.query.projectId
    // console.log("Project id : ",projectId)

    if(projectId){
        var watcher = chokidar.watch(`projects/${projectId}`,{
            ignored : (path)=>path.includes('node_modules'),
            persistent : true, // Keeps the watcher in running state till the app is running
            awaitWriteFinish : {
                stabilityThreshold : 2000, //Ensures stability of files before triggering event
            },
            ignoreInitial : true, // Ignores the initial files in the directory
        })

        watcher.on("all",(event,path)=>{
            console.log(event,path);
            
        })
    }
    
    handleEditorSocketEvents(socket)

    socket.on("disconnect",async ()=>{
        await watcher.close();
        console.log("Editor disconnected")
    })

})

server.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
    
})
// whenever websocket connection is done b/w client and server , first client sends http request and after that
// upgrade on that http and form websocket connection
const webSocketForTerminal = new WebSocketServer({
    noServer : true, // we will handle the upgrade event
})

server.on('upgrade',(req,tcpSocket,head)=>{
    /*
        req : Incoming http request
        socket : TCP Socket
        head : Buffer containing the first packet of the upgraded stream
    */
    //This callback will be called when a client tries to connect to the server through websocket 

    const isTerminal = req.url.includes("/terminal")

    if(isTerminal){
        console.log(req.url)
        const projectId = req.url.split('=')[1]
        console.log("Project Id at terminal after connection",projectId)

        handleContainerCreate(projectId,webSocketForTerminal,req,tcpSocket,head)
    }
})

webSocketForTerminal.on("connection",(ws,req,container)=>{
    console.log("Terminal connected")
    console.log(container)
    handleTerminalCreation(container,ws)
    ws.on('close',()=>{
        container.remove({force:true},(err,data)=>{
            if(err){
                console.log("Error while removing container",err)
            }
            console.log("Container removed successfully",data)
        })
    })
})
