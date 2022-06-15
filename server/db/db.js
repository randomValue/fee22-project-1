import PouchDb from 'pouchdb'
import dbEntries from './db-entries.json' assert { type: 'json' }

export const db = new PouchDb('notesDB')

db.get('notes')
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    if (err.status === 404) {
      db.put({ _id: 'notes', notes: dbEntries.notes })
    }
  })
