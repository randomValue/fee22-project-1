export const readNote = () => fetch('/api/all').then((r) => r.json())
