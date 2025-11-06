import express from 'express'
import projectRouter from './project.routes.js'
const router = express.Router()

router.get('/ping',(req,res)=>{
    return res.status(200).json({
        message : "Pong at controller"
    })
})

router.use('/projects',projectRouter)

export default router;