import { db } from './db.js'
import * as fs from 'fs'
import path from 'path'

export const postData = (app) => {
  app.post('/api/data/:id?', async (req, res) => {
    const { id } = req.params
    let note

    if (id) {
      await db.get('notes').then((data) => {
        const foundIndex = data.notes.findIndex((entry) => entry.id === id)
        if (foundIndex > -1) {
          data.notes[foundIndex] = req.body
          note = data.notes[foundIndex]
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
      })
    }
    res.json({
      text: 'Erfolgreich gespeichert',
      note,
    })
  })
}
