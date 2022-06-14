import { db } from './db.js'
import * as fs from 'fs'
import path from 'path'
import { writeToDb } from './write-to-db.js'

export const postData = (app) => {
  app.post('/api/data/:id?', async (req, res) => {
    const { id } = req.params
    let note

    if (id) {
      await db.get('notes').then((data) => {
        const foundIndex = data.notes.findIndex((entry) => entry.id === id)
        if (foundIndex > -1) {
          data.notes[foundIndex] = req.body
          note = data.notes[foundIndex]
          writeToDb(data)
        }
      })
    }
    res.json({
      text: 'Erfolgreich gespeichert',
      note,
    })
  })
}
