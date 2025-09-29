import ChecklistItem from '../models/ChecklistItem.js'

export async function createItem(req,res,next){
  try { res.status(201).json(await ChecklistItem.create(req.body)) }
  catch(err){ next(err) }
}

export async function listItems(req,res,next){
  try {
    const filter = {}
    if (req.query.userId) filter.userId = req.query.userId
    if (req.query.completed) filter.completed = req.query.completed === 'true'
    const items = await ChecklistItem.find(filter).lean()
    res.json(items)
  } catch(err){ next(err) }
}

export async function getItem(req,res,next){
  try {
    const item = await ChecklistItem.findById(req.params.id)
    if(!item){ const e = new Error('ChecklistItem not found'); e.status=404; return next(e) }
    res.json(item)
  } catch(err){ next(err) }
}

export async function updateItem(req,res,next){
  try {
    const item = await ChecklistItem.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators:true })
    if(!item){ const e = new Error('ChecklistItem not found'); e.status=404; return next(e) }
    res.json(item)
  } catch(err){ next(err) }
}

export async function deleteItem(req,res,next){
  try {
    const item = await ChecklistItem.findByIdAndDelete(req.params.id)
    if(!item){ const e = new Error('ChecklistItem not found'); e.status=404; return next(e) }
    res.status(204).end()
  } catch(err){ next(err) }
}

