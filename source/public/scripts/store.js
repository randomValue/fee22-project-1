import { create } from './reactive/store.js'

export const useStore = create([])

export const useActiveNote = create(null)

export const backUpData = { default: [] }

export const LabelProvider = create(0)

export const useSnackbar = create({ text: '', type: '' })
