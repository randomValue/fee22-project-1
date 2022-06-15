import { fetchPostOptions } from '../lib/fetch-post-options.js'
import { backUpData } from '../store.js'

export const updateNote = async (note, setData) => {
  await fetch(`/api/data/${note?.id}`, {
    ...fetchPostOptions,
    body: JSON.stringify(note),
  })
    .then((data) => data.json())
    .then((v) => {
      setData((state) => {
        const foundIndex = state.findIndex((entry) => entry.id === v.note.id)
        if (foundIndex > -1) {
          state[foundIndex] = v.note
        }
        backUpData.default = state
        return state
      })
    })
}
