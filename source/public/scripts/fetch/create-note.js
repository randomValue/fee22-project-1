import { fetchPostOptions } from '../lib/fetch-post-options.js'

export const createNote = (newNote) =>
  fetch('/api/new', {
    ...fetchPostOptions,
    body: JSON.stringify(newNote),
  }).then((data) => data.json())
