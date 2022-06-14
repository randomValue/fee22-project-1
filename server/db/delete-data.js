import fs from 'fs'
import path from 'path'
import { db } from './db.js'

export const deleteData = (app) => {
  app.post('/delete/:id?', async (req, res) => {
    const { id } = req.params
    if (id) {
      await db
        .get('notes')
        .then((data) => {
          const foundIndex = data.notes.findIndex((entry) => entry.id === id)
          if (foundIndex > -1) {
            data.notes.splice(foundIndex, 1)
            // I'm aware that this is not performant. But to keep things easier, i decided to save data to a file and not create a DB for itself.
            fs.writeFile(
              path.join(path.resolve(), './server/db/db-entries.json'),
              JSON.stringify({ _id: 'notes', ...data }),
              (err) => {
                console.log(err)
              }
            )
            db.put({ _id: 'notes', ...data })
            res.status(200).json({ text: 'Notiz erfolgreich gelöscht', id })
          }
        })
        .catch((err) => {
          res.status(err.status).json(err)
        })
    }
  })
}
