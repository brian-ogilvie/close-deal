const express = require('express')
const PORT = process.env.PORT || 5000

const app = express()

app.get('/', (req, res) => {
  res.send('Welcome to the shopping app!')
})

app.listen(PORT, () => {
  console.log(`Express server is listening on port ${PORT}`)
})