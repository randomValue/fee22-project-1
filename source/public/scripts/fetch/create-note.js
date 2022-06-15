import { fetchPostOptions } from '../lib/fetch-post-options.js'
import { backUpData } from '../store.js'

export const createNote = async (newNote, setData) => {
  await fetch('/api/new', {
    ...fetchPostOptions,
    body: JSON.stringify(newNote),
  })
    .then((data) => data.json())
    .then((v) => {
      setData((state) => {
        state.unshift(v.note)
        backUpData.default = state
        return state
      })
    })
}
