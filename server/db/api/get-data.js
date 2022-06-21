import { db } from '../db.js'

export const getData = (app) => {
  app.get('/api/all', async (req, res) => {
    await db
      .get('notes')
      .then(({ notes }) => {
        res.status(200).json(notes)
      })
      .catch((err) => {
        res.status(err.status).json(err)
      })
  })
}
