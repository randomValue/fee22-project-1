import { db } from '../db.js'

export const putData = (app) => {
  app.put('/api/:id?', async (req, res) => {
    const { id } = req.params
    let note

    if (id) {
      await db
        .get('notes')
        .then((data) => {
          const foundIndex = data.notes.findIndex((entry) => entry.id === id)
          if (foundIndex > -1) {
            data.notes[foundIndex] = req.body
            note = data.notes[foundIndex]
            db.put({ _id: 'notes', ...data })
            res.json({
              text: 'Erfolgreich gespeichert',
              note,
            })
          }
        })
        .catch((err) => {
          res.status(err.status).json({ text: err.message })
        })
    }
  })
}
