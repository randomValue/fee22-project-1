import express from 'express'
import * as path from 'path'
import { getData } from './db/get-data.js'
import { postData } from './db/post-data.js'
import { routes } from './routes/index.js'
import { deleteData } from './db/delete-data.js'

const dirname = path.resolve()

const app = express()
const port = 3000

app.use(express.static(path.join(dirname, './source/public')))
app.use(express.json())

getData(app)
deleteData(app)
postData(app)
routes(app, dirname)

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`)
})
