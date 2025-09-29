import { Router } from 'express'
import { createDegreePlan, deleteDegreePlan, getDegreePlan, listDegreePlans, updateDegreePlan } from '../controllers/DegreePlanController.js'

const router = Router()
router.get('/', listDegreePlans)
router.post('/', createDegreePlan)
router.get('/:id', getDegreePlan)
router.put('/:id', updateDegreePlan)
router.delete('/:id', deleteDegreePlan)
export default router
