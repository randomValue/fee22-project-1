import express from 'express'
import * as path from 'path'
import { getData } from './db/api/get-data.js'
import { putData } from './db/api/put-data.js'
import { routes } from './routes/index.js'
import { deleteData } from './db/api/delete-data.js'
import { postData } from './db/api/post-data.js'

const dirname = path.resolve()

const app = express()
const port = 3000

app.use(express.static(path.join(dirname, './source/public')))
app.use(express.json())

getData(app)
deleteData(app)
putData(app)
postData(app)
routes(app, dirname)

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`)
})
