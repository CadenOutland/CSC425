const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    maxlength: [254, 'Email cannot exceed 254 characters'],
    lowercase: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please fill a valid email address']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, { timestamps: true });

userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);
