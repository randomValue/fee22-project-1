import { db } from '../db.js'

export const deleteData = (app) => {
  app.delete('/:id?', async (req, res) => {
    const { id } = req.params
    if (id) {
      await db
        .get('notes')
        .then((data) => {
          const foundIndex = data.notes.findIndex((entry) => entry.id === id)
          if (foundIndex > -1) {
            data.notes.splice(foundIndex, 1)
            db.put({ _id: 'notes', ...data })
            res.status(200).json({ message: 'Notiz erfolgreich gelöscht', id })
          }
        })
        .catch((err) => {
          res.status(err.status).json(err)
        })
    }
  })
}
