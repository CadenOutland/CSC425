import { Router } from 'express'
import { createItem, deleteItem, getItem, listItems, updateItem } from '../controllers/ChecklistController.js'


const router = Router()
router.get('/', listItems)
router.post('/', createItem)
router.get('/:id', getItem)
router.put('/:id', updateItem)
router.delete('/:id', deleteItem)
export default router
