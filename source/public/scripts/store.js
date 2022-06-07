import { create } from './reactive/store.js'
import { mock } from './mock.js'

export const useStore = create([...mock])

export const useActiveNote = create(null)

export const backUpData = { default: [...mock] }