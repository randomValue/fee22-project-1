import PouchDb from 'pouchdb'

export const db = new PouchDb('notesDB')

db.get('notes')
