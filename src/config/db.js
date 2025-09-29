import mongoose from 'mongoose'

const uri = process.env.MONGODB_URI
if (!uri) {
  console.error('Missing MONGODB_URI in .env')
  process.exit(1)
}

mongoose.set('strictQuery', true)
mongoose.connect(uri, { autoIndex: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => { console.error('Mongo error:', err.message); process.exit(1) })
