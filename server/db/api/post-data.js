import { db } from '../db.js'

export const postData = (app) => {
  app.post('/api/new', async (req, res) => {
    const note = req.body
    const hasNote = !!Object.keys(note).length

    if (hasNote) {
      await db
        .get('notes')
        .then((data) => {
          data.notes.unshift(note)
          db.put({ _id: 'notes', ...data })
          res.json({
            text: 'Erfolgreich neue Notiz erstellt',
            note,
          })
        })
        .catch((err) => {
          res.status(err.status).json({ text: err.message })
        })
    }
  })
}
