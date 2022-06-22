import { db } from '../db.js'

export const getData = (app) => {
  app.get('/api/all', async (req, res) => {
    await db
      .allDocs({ include_docs: true })
      .then(({ rows }) => {
        const docs = rows.reduce((acc, item) => {
          acc.push(item.doc)
          return acc
        }, [])
        res.status(200).json(docs)
      })
      .catch((err) => {
        res.status(err.status).json(err)
      })
  })
}
