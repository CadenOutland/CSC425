import DegreePlan from '../models/DegreePlan.js'

export async function createDegreePlan(req,res,next){
  try { res.status(201).json(await DegreePlan.create(req.body)) }
  catch(err){ next(err) }
}
export async function listDegreePlans(req,res,next){
  try {
    const filter = {}
    if (req.query.userId) filter.userId = req.query.userId
    res.json(await DegreePlan.find(filter).lean())
  } catch(err){ next(err) }
}
export async function getDegreePlan(req,res,next){
  try {
    const plan = await DegreePlan.findById(req.params.id)
    if(!plan){ const e = new Error('DegreePlan not found'); e.status=404; return next(e) }
    res.json(plan)
  } catch(err){ next(err) }
}
export async function updateDegreePlan(req,res,next){
  try {
    const plan = await DegreePlan.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators:true })
    if(!plan){ const e = new Error('DegreePlan not found'); e.status=404; return next(e) }
    res.json(plan)
  } catch(err){ next(err) }
}
export async function deleteDegreePlan(req,res,next){
  try {
    const plan = await DegreePlan.findByIdAndDelete(req.params.id)
    if(!plan){ const e = new Error('DegreePlan not found'); e.status=404; return next(e) }
    res.status(204).end()
  } catch(err){ next(err) }
}
