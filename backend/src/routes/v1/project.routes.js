import express from 'express'
import { createProjectController, getFileContentController, getProjectTreeController } from '../../controllers/project.controller.js'

const router= express.Router()

router.post('/',createProjectController)
router.get('/:projectId/tree',getProjectTreeController)
router.post('/file',getFileContentController)

export default router