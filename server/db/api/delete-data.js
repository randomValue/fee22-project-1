import { db } from '../db.js'

export const deleteData = (app) => {
  app.delete('/:id?', async (req, res) => {
    const { id } = req.params
    if (id) {
      await db
        .get(id)
        .then((data) => {
          db.remove(data)
          res.status(200).json({ message: 'Notiz erfolgreich gelöscht', id })
        })
        .catch((err) => {
          res.status(err.status).json(err)
        })
    }
  })
}
