import { db } from '../db.js'

export const putData = (app) => {
  app.put('/api/:id?', async (req, res) => {
    const { id } = req.params

    if (id) {
      await db
        .get(id)
        .then((doc) => {
          console.log(doc)
          return db.put({ ...req.body, _rev: doc._rev, _id: doc._id })
        })
        .then(() => {
          res.json({
            message: 'Erfolgreich gespeichert',
            note: req.body,
          })
        })
        .catch((err) => {
          console.log()
          res.status(err.status).json({ message: err.message })
        })
    }
  })
}
