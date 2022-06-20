import { fetchPostOptions } from '../lib/fetch-post-options.js'

export const updateNote = (note) =>
  fetch(`/api/${note?.id}`, {
    ...fetchPostOptions,
    method: 'PUT',
    body: JSON.stringify(note),
  }).then((data) => data.json())
