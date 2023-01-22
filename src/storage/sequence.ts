export const ID_SEQUENCE_KEY = '__id_sequence'

export async function getNextID() {
  const currentID = await chrome.storage.sync.get(ID_SEQUENCE_KEY)
  if (typeof currentID[ID_SEQUENCE_KEY] === 'undefined') {
    await chrome.storage.sync.set({ [ID_SEQUENCE_KEY]: 0 })
    return 0
  }
  const nextID = currentID[ID_SEQUENCE_KEY] + 1
  await chrome.storage.sync.set({ [ID_SEQUENCE_KEY]: nextID })
  return nextID
}

export async function resetID() {
  await chrome.storage.sync.set({ [ID_SEQUENCE_KEY]: 0 })
}
