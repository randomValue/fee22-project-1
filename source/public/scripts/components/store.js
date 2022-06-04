import { create } from '../rective/store.js'
import { mock } from '../mock.js'

export const useStore = create([...mock])

export const useActiveNote = create(mock[0])

export const backUpData = { default: [...mock] }
