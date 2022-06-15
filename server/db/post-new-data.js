import { db } from './db.js'
import { writeToDb } from './write-to-db.js'

export const postNewData = (app) => {
  app.post('/api/new', async (req, res) => {
    const note = req.body
    const hasNote = !!Object.keys(note).length

    if (hasNote) {
      await db.get('notes').then((data) => {
        data.notes.unshift(note)
        writeToDb(data)
      })

      res.json({
        text: 'Erfolgreich neue Notiz erstellt',
        note,
      })
    }
  })
}
