import { db } from './db.js'

export const getData = (app) => {
  app.get('/api/:noteId?', async (req, res) => {
    const data = await db
      .get('notes')
      .then(({ notes }) => notes)
      .catch((err) => err)

    const { params } = req

    switch (params.noteId) {
      case 'all':
        if (data.status) {
          res.status(data.status).json(data)
        } else {
          res.status(200).json(data)
        }
        break
      default:
        break
    }
  })
}
