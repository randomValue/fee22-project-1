import { db } from '../db.js'
import { uniqueId } from '../../../source/public/scripts/lib/uniqueId.js'

export const postData = (app) => {
  app.post('/api/new', async (req, res) => {
    const uuid = uniqueId()
    const note = { ...req.body, id: uuid }
    const hasNote = !!Object.keys(note).length

    if (hasNote) {
      await db
        .put({ _id: uuid, ...note })
        .then(() => {
          res.json({
            message: 'Erfolgreich neue Notiz erstellt',
            note,
          })
        })
        .catch((err) => {
          console.log(err)
          res.status(err.status).json({ message: err.message })
        })
    }
  })
}
