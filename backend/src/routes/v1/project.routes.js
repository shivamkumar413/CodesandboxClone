import express from 'express'
import { createProjectController } from '../../controllers/project.controller.js'

const router= express.Router()

router.post('/',createProjectController)

export default router