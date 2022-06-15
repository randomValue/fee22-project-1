import fs from 'fs'
import path from 'path'
import { db } from './db.js'

export const writeToDb = (data) => {
  // I'm aware that this is not performant. But to keep things easier, i decided to save data to a file and not create a DB for itself.
  fs.writeFile(
    path.join(path.resolve(), './server/db/db-entries.json'),
    JSON.stringify({ _id: 'notes', ...data }),
    (err) => {
      console.log(err)
    }
  )
  db.put({ _id: 'notes', ...data })
}