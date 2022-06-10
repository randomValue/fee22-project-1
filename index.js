import express from 'express'
import bodyParser from 'body-parser'
import * as path from 'path'
import { mock } from './source/public/scripts/mock.js'

const dirname = path.resolve()

const app = express()
const port = 3000

const jsonParser = bodyParser.json()
app.use(express.static(path.join(dirname, './source/public')))

app.get('/api/mock', (req, res) => {
  res.json(mock)
})

app.post('/api/data/:id?', jsonParser, (req, res) => {
  console.log(req.body)
  res.json({ text: 'Erfolgreich gespeichert' })
})

app.get('/:note?/:edit?', (req, res) => {
  res.sendFile(path.join(dirname, './source/public/index.html'))
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`)
})
