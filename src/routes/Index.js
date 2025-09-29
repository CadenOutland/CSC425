import { Router } from 'express'
import checklistRoutes from './checklist.js'
import degreeRoutes from './degreePlans.js'

const router = Router()
router.use('/degree-plans', degreeRoutes)
router.use('/checklist', checklistRoutes)
export default router
