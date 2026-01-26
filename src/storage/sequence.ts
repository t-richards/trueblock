export const ID_SEQUENCE_KEY = '__id_sequence'

export async function getNextID() {
  const currentID = await chrome.storage.sync.get(ID_SEQUENCE_KEY)
  if (typeof currentID[ID_SEQUENCE_KEY] !== 'number') {
    await chrome.storage.sync.set({ [ID_SEQUENCE_KEY]: 1 })
    return 1
  }
  if (currentID[ID_SEQUENCE_KEY] < 1) {
    await chrome.storage.sync.set({ [ID_SEQUENCE_KEY]: 1 })
    return 1
  }
  const nextID = currentID[ID_SEQUENCE_KEY] + 1
  await chrome.storage.sync.set({ [ID_SEQUENCE_KEY]: nextID })
  return nextID
}

export async function resetID() {
  await chrome.storage.sync.set({ [ID_SEQUENCE_KEY]: 1 })
}
