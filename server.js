import 'dotenv/config'
import open from 'open'
import app from './src/app.js'

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
  // auto-open browser
  open(`http://localhost:${port}`)
})


