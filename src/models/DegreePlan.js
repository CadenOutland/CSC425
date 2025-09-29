import mongoose from 'mongoose'
const { Schema } = mongoose

const courseSchema = new Schema({
  code: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  credits: { type: Number, required: true, min: 0 },
  term: { type: String, trim: true }
}, { _id: false })

const degreePlanSchema = new Schema({
  userId: { type: String, required: true, index: true },
  major: { type: String, required: true, minlength: 2, maxlength: 120, trim: true },
  school: { type: String, required: true, minlength: 2, maxlength: 160, trim: true },
  status: { type: String, enum: ['active','paused','completed'], default: 'active' },
  totalCreditsRequired: { type: Number, min: 0, default: 120 },
  courses: { type: [courseSchema], default: [] },
  notes: { type: String, maxlength: 2000, trim: true }
}, { timestamps: true })

export default mongoose.model('DegreePlan', degreePlanSchema)
