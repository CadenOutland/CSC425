import mongoose from 'mongoose'
const { Schema } = mongoose

const checklistItemSchema = new Schema({
  userId: { type: String, required: true, index: true },
  title: { type: String, required: true, minlength: 3, maxlength: 120, trim: true },
  dueDate: { type: Date },
  completed: { type: Boolean, default: false },
  category: { type: String, enum: ['benefits','enrollment','transfer','financial','other'], default: 'other' }
}, { timestamps: true })

export default mongoose.model('ChecklistItem', checklistItemSchema)
