import { fetchPostOptions } from '../lib/fetch-post-options.js'

export const deleteNote = (noteId) =>
  fetch(`/${noteId}`, { ...fetchPostOptions, method: 'DELETE' }).then((res) => res.json())
