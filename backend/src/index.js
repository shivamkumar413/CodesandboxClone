import express from 'express'
import cors from 'cors'
import { PORT } from './config/server.config.js'
import apiRouter from './routes/index.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

const router = express.Router()

app.use('/api',apiRouter)

app.get('/ping',(req,res)=>{
    return res.json({
        message : "pong at index.js"
    })
})

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
    
})